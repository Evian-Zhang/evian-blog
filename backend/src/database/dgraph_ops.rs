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
struct GraphqlResponse<T> {
    data: Option<T>,
    errors: Option<Vec<ApiRawError>>
}

#[derive(Serialize)]
pub struct GraphqlQueryBody {
    query: &'static str,
    #[serde(skip_serializing_if = "Option::is_none")]
    variables: Option<HashMap<String, serde_json::Value>>
}

pub async fn query<T: serde::de::DeserializeOwned>(url: &str, body: GraphqlQueryBody) -> Result<T> {
    let response = Client::default()
        .post(url)
        .header("Content-Type", "application/graphql+-")
        .send_body(serde_json::to_string(&body).unwrap())
        .await
        .or(Err(Error::SendError))?;
    if response.status().is_success() {
        let graphql_response = response.json::<GraphqlResponse<T>>()
            .await
            .map_err(|deserialize_error| Error::Deserialize(deserialize_error))?;
        if let Some(errors) = graphql_response.errors {
            Err(Error::Api(errors))
        } else {
            if let Some(data) = graphql_response.data {
                Ok(data)
            } else {
                Err(Error::Unexpected)
            }
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