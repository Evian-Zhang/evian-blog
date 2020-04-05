use actix_web::client::Client;

use std::error;
use std::fmt;

type Result<T> = std::result::Result<T, Error>;

pub async fn alter(url: String) -> Result<()> {
    let response = Client::default()
        .post(url + "/alter")
        .send()
        .await
        .or(Err(Error::SendError))?;
    if response.status() != 200 {
        return Err(Error::AlterError);
    }
    Ok(())
}

#[derive(Debug)]
pub enum Error {
    SendError,
    AlterError
}

impl error::Error for Error { }

impl fmt::Display for Error {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        use Error::*;

        let message = match &self {
            SendError => String::from("Send error"),
            AlterError => String::from("Alter error"),
        };

        write!(f, "{}", message)
    }
}