use diesel::prelude::*;
use diesel::pg::PgConnection;

use std::error;
use std::fmt;

type Result<T> = std::result::Result<T, Error>;

pub fn get_all_tags(pg_connection: &PgConnection) -> Result<Vec<String>> {
    use super::schema::tags::dsl::*;

    tags.select(name)
        .load::<String>(pg_connection)
        .map_err(|sql_error| Error::SqlFailed(sql_error))
}

pub fn get_all_series(pg_connection: &PgConnection) -> Result<Vec<String>> {
    use super::schema::series::dsl::*;

    series.select(name)
        .load::<String>(pg_connection)
        .map_err(|sql_error| Error::SqlFailed(sql_error))
}

pub fn get_all_articles_of_tag(pg_connection: &PgConnection, tag_name: &String) -> Result<Vec<String>> {
    use super::schema::{tags, articles, tag_with_articles};

    articles::dsl::articles
        .select(articles::dsl::title)
        .inner_join(tag_with_articles::dsl::tag_with_articles
            .inner_join(tags::dsl::tags)
            .on(tag_with_articles::dsl::tag_id.eq(tags::dsl::id)
                .and(tags::dsl::name.eq(tag_name))
            )
        )
        .load::<String>(pg_connection)
        .map_err(|sql_error| Error::SqlFailed(sql_error))
}

pub fn get_all_articles_of_series(pg_connection: &PgConnection, series_name: &String) -> Result<Vec<String>> {
    use super::schema::{series, articles};

    articles::dsl::articles
        .select(articles::dsl::title)
        .inner_join(series::dsl::series
            .on(articles::dsl::series_id.eq(series::dsl::id.nullable())
                .and(series::dsl::name.eq(&series_name))
            )
        )
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