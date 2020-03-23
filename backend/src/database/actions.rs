use super::PooledPgConnection;

use diesel::prelude::*;
use actix_web::web;

use std::error;
use std::fmt;

type Result<T> = std::result::Result<T, Error>;

pub async fn get_tags(pg_connection: PooledPgConnection) -> Result<Vec<String>> {
    use super::schema::tags::dsl::*;

    Ok(web::block(move || {
        tags.select(name)
            .load::<String>(&pg_connection)
            .map_err(|sql_error| Error::SqlFailed(sql_error))
    }).await?)
}

#[derive(Debug)]
pub enum Error {
    SqlFailed(diesel::result::Error),
    BlockFailed
}

impl error::Error for Error { }

impl fmt::Display for Error {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        use Error::*;

        let message = match &self {
            SqlFailed(sql_error) => format!("SQL error: {}", sql_error),
            BlockFailed => String::from("Actix runtime error: canceled."),
        };

        write!(f, "{}", message)
    }
}

impl From<actix_web::error::BlockingError<Error>> for Error {
    fn from(block_error: actix_web::error::BlockingError<Error>) -> Error {
        use actix_web::error::BlockingError;

        match block_error {
            BlockingError::Error(error) => error,
            BlockingError::Canceled => Error::BlockFailed
        }
    }
}