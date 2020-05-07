pub mod article;
pub mod project;
mod neo4j_ops;

use crate::init::DatabaseConfig;

use reqwest::Client;

#[derive(Clone)]
pub struct Database {
    pub article: article::Database,
    pub project: project::Database
}

impl Database {
    pub fn new(config: DatabaseConfig) -> Database {
        let authorization = base64::encode(format!("{}:{}", config.username, config.password));
        // `Client` already uses an `Arc` internally
        let client = Client::new();
        Database {
            article: article::Database::new(&config, authorization.clone(), client.clone()),
            project: project::Database::new(&config, authorization.clone(), client.clone())
        }
    }
}
