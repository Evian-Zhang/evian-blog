use super::Database;

use super::models::*;
use super::super::neo4j_ops;
use neo4j_ops::Neo4jStatement;

use std::error;
use std::fmt;

type Result<T> = std::result::Result<T, Error>;

impl Database {
    pub async fn get_all_projects(&self) -> Result<Vec<Project>> {
        let query_str = "\
MATCH (project:Project)
RETURN {name: project.name, description: project.description, languages: project.languages, frameworks: language.frameworks, url: project.url} AS project_info
ORDER BY project_info.name ASC";
        let query_statment = Neo4jStatement {
            statement: query_str,
            parameters: None
        };
        Ok(neo4j_ops::query::<Project>(&self.url, &self.client, &self.authorization, query_statment)
            .await?)
    }
}

#[derive(Debug)]
pub enum Error {
    Database(neo4j_ops::Error),
}

impl error::Error for Error { }

impl fmt::Display for Error {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        use Error::*;

        let message = match &self {
            Database(database_error) => format!("{}", database_error),
        };

        write!(f, "{}", message)
    }
}

impl From<neo4j_ops::Error> for Error {
    fn from(database_error: neo4j_ops::Error) -> Self {
        Self::Database(database_error)
    }
}
