pub mod schema;
pub mod models;
pub mod actions;

use log::{info, warn};
use diesel::prelude::*;
use diesel::pg::PgConnection;
use diesel::r2d2::{self, ConnectionManager, PooledConnection};

use std::error;
use std::fmt;
use std::time::Duration;

pub type DbPool = r2d2::Pool<ConnectionManager<PgConnection>>;
pub type PooledPgConnection = PooledConnection<ConnectionManager<PgConnection>>;
type Result<T> = std::result::Result<T, Error>;

static CONNECTION_TIMEOUT: u64 = 15;
static MAX_CONNECT_SIZE: u32 = 5;
static MAX_GET_CONNNECTION_TIMES: usize = 5;

pub fn create_connection_pool(url: String) -> DbPool {
    loop {
        let manager = ConnectionManager::<PgConnection>::new(&url);
        match r2d2::Pool::builder()
            .max_size(MAX_CONNECT_SIZE)
            .connection_timeout(Duration::from_secs(CONNECTION_TIMEOUT))
            .build(manager) {
            Ok(db_pool) => {
                info!("Successfully connected to database at {} with {} connections.", &url, MAX_CONNECT_SIZE);
                break db_pool
            },
            Err(error) => {
                warn!("Cannot connect to database at {} due to {}, retrying...", &url, error);
            }
        }
    }
}

pub fn embed_migration(pg_connection: &PgConnection) -> Result<()> {
    embed_migrations!();
    embedded_migrations::run_with_output(pg_connection, &mut std::io::stdout())
        .map_err(|migration_error| Error::MigrationError(migration_error))
}

pub fn get_connection(db_pool: &DbPool) -> Result<PooledPgConnection> {
    for count in 0..MAX_GET_CONNNECTION_TIMES {
        match db_pool.get() {
            Ok(pg_connection) => return Ok(pg_connection),
            Err(error) => {
                warn!("Cannot get a connection from connection pool due to {}, retried {} times...", error, count);
            }
        }
    }
    Err(Error::CannotGetConnectionFromPool)
}

#[derive(Debug)]
pub enum Error {
    CannotGetConnectionFromPool,
    MigrationError(diesel_migrations::RunMigrationsError),
    SqlFailed(diesel::result::Error)
}

impl error::Error for Error { }

impl fmt::Display for Error {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        use Error::*;

        let message = match &self {
            CannotGetConnectionFromPool => String::from("Cannot get connection from pool."),
            MigrationError(migration_error) => format!("Migration error: {}", migration_error),
            SqlFailed(sql_error) => format!("SQL error: {}", sql_error),
        };

        write!(f, "{}", message)
    }
}
