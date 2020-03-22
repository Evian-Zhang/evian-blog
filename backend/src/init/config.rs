use serde::{Deserialize};

use std::fs;
use std::path::PathBuf;
use std::error;
use std::fmt;

type Result<T> = std::result::Result<T, Error>;

#[derive(Deserialize)]
pub struct AppConfigs {
    pub development: AppConfig,
    pub production: AppConfig,
}

#[derive(Deserialize)]
pub struct AppConfig {
    pub server: ServerConfig,
}

#[derive(Deserialize)]
pub struct ServerConfig {
    pub address: String,
    pub port: usize,
}

// read server config from config.toml
pub fn read_config() -> Result<AppConfigs> {
    let config_path = PathBuf::from("config.toml");
    let config_str = fs::read_to_string(config_path).or(Err(Error::ConfigNotFound))?;
    toml::from_str(&config_str).or_else(|toml_error| Err(Error::WrongConfigSyntax(toml_error)))
}

#[derive(Debug)]
pub enum Error {
    ConfigNotFound,
    WrongConfigSyntax(toml::de::Error),
}

impl error::Error for Error { }

impl fmt::Display for Error {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        use Error::*;

        let message = match &self {
            ConfigNotFound => String::from("Unable to open config.toml"),
            WrongConfigSyntax(toml_error) => format!("Config syntax error: {}", toml_error),
        };

        write!(f, "{}", message)
    }
}