pub mod article;
mod neo4j_ops;

use crate::init::DatabaseConfig;

#[derive(Clone)]
pub struct Database {
    pub article: article::ArticleDatabase
}

impl Database {
    pub fn new(config: DatabaseConfig) -> Database {
        Database {
            article: article::ArticleDatabase::new(&config)
        }
    }
}
