mod action;

use crate::init::{DatabaseConfig, BlogDatabase};

#[derive(Clone)]
pub struct Database {
    file_path: String
}

impl Database {
    pub fn new(config: &DatabaseConfig) -> Database {
        Database {
            file_path: config.database_name.get_name_by_database(BlogDatabase::Resume).clone()
        }
    }
}