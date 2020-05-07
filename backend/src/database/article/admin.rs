use super::Database;

use super::models::*;
use super::super::neo4j_ops;
use neo4j_ops::Neo4jStatement;

use std::error;
use std::fmt;

type Result<T> = std::result::Result<T, Error>;

impl Database {
    pub async fn post_article(&self, article: Article) -> Result<()> {
        match article {
            Article { series: Some(series), series_index: Some(series_index), .. } => {
                let mutate_str = "\
MERGE (article:Article {title: $title})
SET article.body = $body, article.publish_date = $publish_date, article.last_revise_date = $last_revise_date
MERGE (series:Series {name: $series})
MERGE (article)-[:IN_SERIES {index: $series_index}]->(series)
WITH article
UNWIND $tags AS tag_name
MERGE (tag:Tag {name: tag_name})
MERGE (article)-[:HAS_TAG]->(tag)";
                let mutate_statement = Neo4jStatement {
                    statement: mutate_str,
                    parameters: Some(hashmap!{
                        "title" => serde_json::Value::from(article.title),
                        "body" => serde_json::Value::from(article.body),
                        "publish_date" => serde_json::Value::from(article.publish_date),
                        "last_revise_date" => serde_json::Value::from(article.last_revise_date),
                        "series" => serde_json::Value::from(series),
                        "series_index" => serde_json::Value::from(series_index),
                        "tags" => serde_json::Value::from(article.tags)
                    })
                };
                neo4j_ops::mutate(&self.url, &self.client, &self.authorization, mutate_statement)
                    .await?;
                Ok(())
            },
            Article { series: None, series_index: None, .. } => {
                let mutate_str = "\
MERGE (article:Article {title: $title})
SET article.body = $body, article.publish_date = $publish_date, article.last_revise_date = $last_revise_date
WITH article
UNWIND $tags AS tag_name
MERGE (tag:Tag {name: tag_name})
MERGE (article)-[:HAS_TAG]->(tag)";
                let mutate_statement = Neo4jStatement {
                    statement: mutate_str,
                    parameters: Some(hashmap!{
                        "title" => serde_json::Value::from(article.title),
                        "body" => serde_json::Value::from(article.body),
                        "publish_date" => serde_json::Value::from(article.publish_date),
                        "last_revise_date" => serde_json::Value::from(article.last_revise_date),
                        "tags" => serde_json::Value::from(article.tags)
                    })
                };
                neo4j_ops::mutate(&self.url, &self.client, &self.authorization, mutate_statement)
                    .await?;
                Ok(())
            }
            _ => {
                Err(Error::WrongArticleField)
            }
        }
    }
}

#[derive(Debug)]
pub enum Error {
    Database(neo4j_ops::Error),
    WrongArticleField,
}

impl error::Error for Error { }

impl fmt::Display for Error {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        use Error::*;

        let message = match &self {
            Database(database_error) => format!("{}", database_error),
            WrongArticleField => String::from("Wrong article fields"),
        };

        write!(f, "{}", message)
    }
}

impl From<neo4j_ops::Error> for Error {
    fn from(database_error: neo4j_ops::Error) -> Self {
        Self::Database(database_error)
    }
}