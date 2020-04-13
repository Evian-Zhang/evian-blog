mod config;
pub use config::{AppConfig, read_config, DatabaseConfig};

use crate::database;
// pub use database::DbPool;

use log::{LevelFilter, info};
use chrono::Local;

use std::env;
use std::io::Write;
use std::error;
use std::fmt;

type Result<T> = std::result::Result<T, Error>;

enum BlogEnv {
    Development,
    Production,
}

impl From<&str> for BlogEnv {
    fn from(s: &str) -> BlogEnv {
        match s {
            "development" => BlogEnv::Development,
            "production" => BlogEnv::Production,
            _ => BlogEnv::Development
        }
    }
}

pub fn init_logging() {
    env_logger::Builder::new()
        .format(|buf, record| {
            writeln!(buf, 
                "{} [{}] - {}",
                Local::now().format("%Y-%m-%dT%H:%M:%S"),
                record.level(),
                record.args()
            )
        })
        .filter(None, LevelFilter::Info)
        .init();
    info!("Successfully init logging");
}

pub fn init_config() -> Result<AppConfig> {
    let blog_env = match env::var("BLOG_ENV") {
        Ok(blog_env) => BlogEnv::from(blog_env.as_str()),
        #[cfg(debug_assertions)]
        _ => BlogEnv::Development,
        #[cfg(not(debug_assertions))]
        _ => BlogEnv::Production
    };

    let app_configs = read_config()?;
    
    info!("Successfully init config");

    Ok(match blog_env {
        BlogEnv::Development => app_configs.development,
        BlogEnv::Production => app_configs.production
    })
}

// pub fn init_database(url: String) -> Result<DbPool> {
//     let db_pool = database::create_connection_pool(url);
//     let pg_connection = database::get_connection(&db_pool)?;
//     database::embed_migration(&pg_connection)?;
//     Ok(db_pool)
// }

#[derive(Debug)]
pub enum Error {
    Config(config::Error),
    // Database(database::Error),
}

impl error::Error for Error { }

impl fmt::Display for Error {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        use Error::*;

        let message = match &self {
            Config(config_error) => format!("{}", config_error),
            // Database(database_error) => format!("{}", database_error)
        };

        write!(f, "{}", message)
    }
}

impl From<config::Error> for Error {
    fn from(config_error: config::Error) -> Error {
        Error::Config(config_error)
    }
}

// impl From<database::Error> for Error {
//     fn from(database_error: database::Error) -> Error {
//         Error::Database(database_error)
//     }
// }
