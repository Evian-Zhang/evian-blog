use serde::{Deserialize};

use std::fs;
use std::env;
use std::error;
use std::fmt;

type Result<T> = std::result::Result<T, Error>;

#[derive(Deserialize)]
struct RawAppConfig {
    server: ServerConfig,
    database: RawDatabaseConfig
}

#[derive(Deserialize)]
pub struct ServerConfig {
    pub address: String,
    pub port: usize,
}

impl ServerConfig {
    pub fn to_socket(&self) -> String {
        format!("{}:{}", self.address, self.port)
    }
}

#[derive(Deserialize)]
struct RawDatabaseConfig {
    pub username: String,
    pub address: String,
    pub port: usize,
    pub database_name: String,
}

pub struct AppConfig {
    pub server: ServerConfig,
    pub database: DatabaseConfig
}

impl AppConfig {
    fn from_raw(raw_app_config: RawAppConfig, password: String) -> Self {
        Self {
            server: raw_app_config.server,
            database: DatabaseConfig::from_raw(raw_app_config.database, password)
        }
    }
}

pub struct DatabaseConfig {
    pub username: String,
    pub password: String,
    pub address: String,
    pub port: usize,
    pub database_name: String
}

impl DatabaseConfig {
    fn from_raw(raw_database_config: RawDatabaseConfig, password: String) -> Self {
        Self {
            username: raw_database_config.username,
            password,
            address: raw_database_config.address,
            port: raw_database_config.port,
            database_name: raw_database_config.database_name
        }
    }

    pub fn to_url(&self) -> String {
        format!("http://{}:{}/db/{}/tx/commit/",
            self.address,
            self.port,
            self.database_name
        )
    }
}

// read server config from config.toml
pub fn read_config() -> Result<AppConfig> {
    let config_path = env::var("CONFIG_FILE").or(Err(Error::EnviromentVariableNotFound))?;
    let config_str = fs::read_to_string(config_path).or(Err(Error::ConfigNotFound))?;
    let raw_config = toml::from_str::<RawAppConfig>(&config_str).map_err(|toml_error| Error::WrongConfigSyntax(toml_error))?;
    
    let secret_path = env::var("DATABASE_PASSWORD_FILE").or(Err(Error::EnviromentVariableNotFound))?;
    let secret = fs::read_to_string(secret_path).or(Err(Error::SecretNotFound))?;
    Ok(AppConfig::from_raw(raw_config, secret))
}

#[derive(Debug)]
pub enum Error {
    EnviromentVariableNotFound,
    ConfigNotFound,
    SecretNotFound,
    WrongConfigSyntax(toml::de::Error),
}

impl error::Error for Error { }

impl fmt::Display for Error {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        use Error::*;

        let message = match &self {
            EnviromentVariableNotFound => String::from("Unable to find envrionment variables"),
            ConfigNotFound => String::from("Unable to open config file"),
            SecretNotFound => String::from("Unable to open secret file"),
            WrongConfigSyntax(toml_error) => format!("Config syntax error: {}", toml_error),
        };

        write!(f, "{}", message)
    }
}