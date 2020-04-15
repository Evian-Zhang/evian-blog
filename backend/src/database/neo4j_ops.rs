use reqwest::Client;
use serde::{Serialize, Deserialize};

use std::collections::HashMap;
use std::error;
use std::fmt;

type Result<T> = std::result::Result<T, Error>;

#[derive(Deserialize, Debug)]
pub struct ApiRawError {
    message: String
}

#[derive(Deserialize)]
struct Neo4jResponse<T> {
    results: Vec<Neo4jResult<T>>,
    errors: Vec<ApiRawError>
}

#[derive(Deserialize)]
struct Neo4jResult<T> {
    data: Vec<Neo4jData<T>>
}

#[derive(Deserialize)]
struct Neo4jData<T> {
    row: Vec<T>
}

#[derive(Serialize)]
struct Neo4jQueryBody {
    statements: Vec<Neo4jStatement>
}

#[derive(Serialize)]
pub struct Neo4jStatement {
    pub statement: &'static str,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub parameters: Option<HashMap<&'static str, serde_json::Value>>
}

pub async fn query<T: serde::de::DeserializeOwned>(
    url: &str,
    client: &Client,
    authorization: &str,
    neo4j_statement: Neo4jStatement
) -> Result<Vec<T>> {
    let query = Neo4jQueryBody {
        statements: vec![neo4j_statement]
    };
    let response = client
        .post(url)
        .header("Authorization", authorization)
        .header("Content-Type", "application/json")
        .body(serde_json::to_string(&query).unwrap())
        .send()
        .await
        .or(Err(Error::SendError))?;
    if response.status().is_success() {
        let mut neo4j_response = response.json::<Neo4jResponse<T>>()
            .await
            .map_err(|deserialize_error| Error::Deserialize(deserialize_error))?;
        if !neo4j_response.errors.is_empty() {
            Err(Error::Api(neo4j_response.errors))
        } else {
            Ok(neo4j_response.results
                .pop().ok_or(Error::Unexpected)?
                .data.into_iter()
                .map(|mut neo4j_data| neo4j_data.row.pop())
                .collect::<Option<Vec<_>>>()
                .ok_or(Error::Unexpected)?)
        }
    } else {
        let status_code = response.status().as_u16();
        Err(Error::BadResponse(status_code))
    }
}

#[derive(Debug)]
pub enum Error {
    SendError,
    BadResponse(u16),
    Api(Vec<ApiRawError>),
    Deserialize(reqwest::Error),
    Unexpected
}

impl error::Error for Error { }

impl fmt::Display for Error {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        use Error::*;

        let message = match &self {
            SendError => String::from("Send error"),
            BadResponse(status_code) => format!("Bad response with status code: {}", status_code),
            Api(api_error) => format!("{:?}", api_error),
            Deserialize(de_error) => format!("Deserialize error: {}", de_error),
            Unexpected => String::from("Unexpected error")
        };

        write!(f, "{}", message)
    }
}