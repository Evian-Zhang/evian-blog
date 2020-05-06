mod config;
pub use config::{AppConfig, read_config, DatabaseConfig, BlogDatabase};

use crate::database::Database;

use log::{LevelFilter, info};
use chrono::Local;

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
    let app_config = read_config()?;
    
    info!("Successfully init config");

    Ok(app_config)
}

pub fn init_database(database_config: DatabaseConfig) -> Database {
    Database::new(database_config)
}

#[derive(Debug)]
pub enum Error {
    Config(config::Error),
}

impl error::Error for Error { }

impl fmt::Display for Error {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        use Error::*;

        let message = match &self {
            Config(config_error) => format!("{}", config_error),
        };

        write!(f, "{}", message)
    }
}

impl From<config::Error> for Error {
    fn from(config_error: config::Error) -> Error {
        Error::Config(config_error)
    }
}
