use diesel::prelude::*;
use diesel::pg::PgConnection;

use std::error;
use std::fmt;

type Result<T> = std::result::Result<T, Error>;

pub fn get_tags(pg_connection: &PgConnection) -> Result<Vec<String>> {
    use super::schema::tags::dsl::*;

    tags.select(name)
        .load::<String>(pg_connection)
        .map_err(|sql_error| Error::SqlFailed(sql_error))
}

#[derive(Debug)]
pub enum Error {
    SqlFailed(diesel::result::Error),
}

impl error::Error for Error { }

impl fmt::Display for Error {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        use Error::*;

        let message = match &self {
            SqlFailed(sql_error) => format!("SQL error: {}", sql_error),
        };

        write!(f, "{}", message)
    }
}