use actix_web::client::Client;
use serde::{Serialize, Deserialize};

use std::collections::HashMap;
use std::error;
use std::fmt;

type Result<T> = std::result::Result<T, Error>;

#[derive(Deserialize, Debug)]
struct ApiRawError {
    message: String
}

#[derive(Deserialize)]
struct Neo4jResponse<T> {
    results: Vec<Neo4jResult<T>>,
    errors: Vec<ApiRawError>
}

#[derive(Deserialize)]
struct Neo4jResult<T> {
    columns: Vec<String>,
    data: Neo4jData<T>
}

#[derive(Deserialize)]
struct Neo4jData<T> {
    row: Vec<T>
}

#[derive(Serialize)]
pub struct Neo4jQueryBody {
    statements: Vec<Neo4jStatement>
}

#[derive(Serialize)]
pub struct Neo4jStatement {
    statement: &'static str,
    #[serde(skip_serializing_if = "Option::is_none")]
    parameters: Option<HashMap<String, serde_json::Value>>
}

pub async fn query<T: serde::de::DeserializeOwned>(
    url: &str,
    client: &Client,
    authorization: &str,
    neo4j_statement: Neo4jStatement
) -> Result<T> {
    let query = Neo4jQueryBody {
        statements: vec![neo4j_statement]
    };
    let mut response = client
        .post(url)
        .header("Authorization", authorization)
        .send_body(serde_json::to_string(&query).unwrap())
        .await
        .or(Err(Error::SendError))?;
    if response.status().is_success() {
        let mut neo4j_response = response.json::<Neo4jResponse<T>>()
            .await
            .map_err(|deserialize_error| Error::Deserialize(deserialize_error))?;
        if !neo4j_response.errors.is_empty() {
            Err(Error::Api(neo4j_response.errors))
        } else {
            Ok(neo4j_response.results.pop().ok_or(Error::Unexpected)?
                .data.row.pop().ok_or(Error::Unexpected)?)
        }
    } else {
        Err(Error::BadResponse(response.status().as_u16()))
    }
}

#[derive(Debug)]
pub enum Error {
    SendError,
    BadResponse(u16),
    Api(Vec<ApiRawError>),
    Deserialize(awc::error::JsonPayloadError),
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