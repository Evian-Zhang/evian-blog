pub mod models;
mod visitor;
mod admin;

use crate::init::{DatabaseConfig, BlogDatabase};

use reqwest::Client;

#[derive(Clone)]
pub struct Database {
    url: String,
    authorization: String,
    client: Client
}

impl Database {
    pub fn new(config: &DatabaseConfig, authorization: String, client: Client) -> Database {
        Database {
            url: config.to_url(BlogDatabase::Project),
            authorization,
            client
        }
    }
}