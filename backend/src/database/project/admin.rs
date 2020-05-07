use super::Database;

use super::models::*;
use super::super::neo4j_ops;
use neo4j_ops::Neo4jStatement;

use std::error;
use std::fmt;

type Result<T> = std::result::Result<T, Error>;

impl Database {
    pub async fn post_project(&self, project: Project) -> Result<()> {
        let mutate_str = "\
MERGE (project:Project {name: $name})
SET project.description = $description, project.languages = $languages, project.frameworks = $frameworks, project.url = $url";
        let mutate_statement = Neo4jStatement {
            statement: mutate_str,
            parameters: Some(hashmap!{
                "name" => serde_json::Value::from(project.name),
                "description" => serde_json::Value::from(project.description),
                "languages" => serde_json::Value::from(project.languages),
                "frameworks" => serde_json::Value::from(project.frameworks),
                "url" => serde_json::Value::from(project.url)
            })
        };
        neo4j_ops::mutate(&self.url, &self.client, &self.authorization, mutate_statement)
            .await?;
        Ok(())
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
