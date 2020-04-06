use actix_web::client::Client;
use serde::Deserialize;

use std::collections::HashMap;
use std::error;
use std::fmt;

type Result<T> = std::result::Result<T, Error>;

#[derive(Deserialize, Debug)]
struct ApiRawError {
    message: String,
    #[serde(flatten)]
    remain: HashMap<String, serde_json::value::Value>,
}

#[derive(Deserialize, Debug)]
struct ApiError {
    errors: Vec<ApiRawError>,
    #[serde(flatten)]
    remain: HashMap<String, serde_json::value::Value>
}

#[derive(Deserialize)]
struct QueryResult<T> {
    data: HashMap<String, Vec<T>>,
    remain: HashMap<String, serde_json::value::Value>
}

pub async fn alter(url: String) -> Result<()> {
    let response = Client::default()
        .post(url + "/alter")
        .send()
        .await
        .or(Err(Error::SendError))?;
    match response.status().as_u16() {
        200 => Ok(()),
        400 => {
            if let Ok(api_error) = response.json::<ApiError>().await {
                Err(Error::Api(api_error))
            } else {
                Err(Error::Unexpected)
            }
        }
        _ => Err(Error::Unexpected)
    }
}

pub async fn query<T: serde::de::DeserializeOwned>(url: String, body: String) -> Result<HashMap<String, Vec<T>>> {
    let response = Client::default()
        .post(url + "/query")
        .header("Content-Type", "application/graphql+-")
        .send_body(body)
        .await
        .or(Err(Error::SendError))?;
    match response.status().as_u16() {
        200 => {
            if let Ok(query_result) = response.json::<QueryResult<T>>().await {
                Ok(query_result.data)
            } else {
                Err(Error::Unexpected)
            }
        },
        400 => {
            if let Ok(api_error) = response.json::<ApiError>().await {
                Err(Error::Api(api_error))
            } else {
                Err(Error::Unexpected)
            }
        }
        _ => Err(Error::Unexpected)
    }
}

#[derive(Debug)]
pub enum Error {
    SendError,
    Api(ApiError),
    Deserialize(serde_json::error::Error),
    Unexpected
}

impl error::Error for Error { }

impl fmt::Display for Error {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        use Error::*;

        let message = match &self {
            SendError => String::from("Send error"),
            Api(api_error) => format!("{:?}", api_error.errors),
            Deserialize(de_error) => format!("Deserialize error: {}", de_error),
            Unexpected => String::from("Unexpected error")
        };

        write!(f, "{}", message)
    }
}