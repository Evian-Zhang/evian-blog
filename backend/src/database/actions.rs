use diesel::prelude::*;
use diesel::pg::PgConnection;

use std::error;
use std::fmt;

type Result<T> = std::result::Result<T, Error>;

pub fn get_all_tags(pg_connection: &PgConnection) -> Result<Vec<super::models::Tag>> {
    use super::schema::tags::dsl::*;

    tags.order(article_count.desc())
        .load::<super::models::Tag>(pg_connection)
        .map_err(|sql_error| Error::SqlFailed(sql_error))
}

pub fn get_all_series(pg_connection: &PgConnection) -> Result<Vec<String>> {
    use super::schema::series::dsl::*;

    series.select(name)
        .order(name.asc())
        .load::<String>(pg_connection)
        .map_err(|sql_error| Error::SqlFailed(sql_error))
}

// return all articles whose tag_name is `tag_name` in their `publish_date`'s descending order
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
        .order(articles::dsl::publish_date.desc())
        .load::<String>(pg_connection)
        .map_err(|sql_error| Error::SqlFailed(sql_error))
}

// return all articles whose series_name is `series_name` in their `series_index`'s ascending order
pub fn get_all_articles_of_series(pg_connection: &PgConnection, series_name: &String) -> Result<Vec<String>> {
    use super::schema::{series, articles};

    articles::dsl::articles
        .select(articles::dsl::title)
        .inner_join(series::dsl::series
            .on(articles::dsl::series_id.eq(series::dsl::id.nullable())
                .and(series::dsl::name.eq(&series_name))
            )
        )
        .order(articles::dsl::series_index.asc())
        .load::<String>(pg_connection)
        .map_err(|sql_error| Error::SqlFailed(sql_error))
}

pub fn get_article(pg_connection: &PgConnection, article_title: &String) -> Result<Option<super::models::Article>> {
    use super::schema::articles::dsl::*;

    match articles
        .filter(title.eq(article_title))
        .load::<super::models::Article>(pg_connection) {
        Ok(mut article_vec) => {
            if article_vec.len() > 1 {
                Err(Error::NonUnique(format!("Querying articles with article_title: {}", article_title)))
            } else {
                Ok(article_vec.pop())
            }
        },
        Err(error) => Err(Error::SqlFailed(error))
    }
}

#[derive(Debug)]
pub enum Error {
    SqlFailed(diesel::result::Error),
    NonUnique(String)
}

impl error::Error for Error { }

impl fmt::Display for Error {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        use Error::*;

        let message = match &self {
            SqlFailed(sql_error) => format!("SQL error: {}", sql_error),
            NonUnique(description) => format!("The result is non-unique: {}", description),
        };

        write!(f, "{}", message)
    }
}