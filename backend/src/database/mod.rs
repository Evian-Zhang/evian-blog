pub mod schema;
pub mod models;

use log::{info, warn};
use diesel::prelude::*;
use diesel::pg::PgConnection;

use std::error;
use std::fmt;

type Result<T> = std::result::Result<T, Error>;


pub fn establish_connection(url: String) -> PgConnection {
    loop {
        match PgConnection::establish(url.as_str()) {
            Ok(pg_connection) => {
                info!("Successfully connected to database at {}", &url);
                break pg_connection
            }
            Err(error) => {
                warn!("Cannot connect to database at {} due to {}, retrying...", &url, error);
            }
        }
    }
}

pub fn embed_migration(pg_connection: &PgConnection) -> Result<()> {
    embed_migrations!();
    embedded_migrations::run_with_output(pg_connection, &mut std::io::stdout())
        .or_else(|migration_error| Err(Error::MigrationError(migration_error)))
}

#[derive(Debug)]
pub enum Error {
    MigrationError(diesel_migrations::RunMigrationsError)
}

impl error::Error for Error { }

impl fmt::Display for Error {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        use Error::*;

        let message = match &self {
            MigrationError(migration_error) => format!("Migration error: {}", migration_error),
        };

        write!(f, "{}", message)
    }
}


