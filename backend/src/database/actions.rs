use diesel::prelude::*;
use diesel::pg::PgConnection;
use chrono::{DateTime, Utc};

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
// should check: page_index >= 0, page_size > 0
pub fn get_all_articles_of_tag(pg_connection: &PgConnection, tag_name: &String, page_index: i64, page_size: i64) -> Result<(i64, Vec<(String, DateTime<Utc>)>)> {
    use super::schema::{tags, articles, tag_with_articles};

    let total_count = articles::dsl::articles
        .count()
        .inner_join(tag_with_articles::dsl::tag_with_articles
            .inner_join(tags::dsl::tags)
            .on(tag_with_articles::dsl::tag_id.eq(tags::dsl::id)
                .and(tags::dsl::name.eq(tag_name))
            )
        )
        .get_result::<i64>(pg_connection)
        .map_err(|sql_error| Error::SqlFailed(sql_error))?;

    let total_pages = if total_count == 0 {
        0i64
    } else {
        (total_count - 1) / page_size + 1
    };

    let article_metas = articles::dsl::articles
        .select((articles::dsl::title, articles::dsl::publish_date))
        .inner_join(tag_with_articles::dsl::tag_with_articles
            .inner_join(tags::dsl::tags)
            .on(tag_with_articles::dsl::tag_id.eq(tags::dsl::id)
                .and(tags::dsl::name.eq(tag_name))
            )
        )
        .order(articles::dsl::publish_date.desc())
        .limit(page_size)
        .offset(page_index * page_size)
        .load::<(String, DateTime<Utc>)>(pg_connection)
        .map_err(|sql_error| Error::SqlFailed(sql_error))?;

    Ok((total_pages, article_metas))
}

// return all articles whose series_name is `series_name` in their `series_index`'s ascending order
// should check: page_index >= 0, page_size > 0
pub fn get_all_articles_of_series(pg_connection: &PgConnection, series_name: &String, page_index: i64, page_size: i64) -> Result<(i64, Vec<(String, DateTime<Utc>)>)> {
    use super::schema::{series, articles};

    let total_count = articles::dsl::articles
        .count()
        .inner_join(series::dsl::series
            .on(articles::dsl::series_id.eq(series::dsl::id.nullable())
                .and(series::dsl::name.eq(&series_name))
            )
        )
        .get_result::<i64>(pg_connection)
        .map_err(|sql_error| Error::SqlFailed(sql_error))?;

    let total_pages = if total_count == 0 {
        0i64
    } else {
        (total_count - 1) / page_size + 1
    };

    let article_metas = articles::dsl::articles
        .select((articles::dsl::title, articles::dsl::publish_date))
        .inner_join(series::dsl::series
            .on(articles::dsl::series_id.eq(series::dsl::id.nullable())
                .and(series::dsl::name.eq(&series_name))
            )
        )
        .order(articles::dsl::series_index.asc())
        .limit(page_size)
        .offset(page_index * page_size)
        .load::<(String, DateTime<Utc>)>(pg_connection)
        .map_err(|sql_error| Error::SqlFailed(sql_error))?;

    Ok((total_pages, article_metas))
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

pub fn get_all_articles(pg_connection: &PgConnection, page_index: i64, page_size: i64) -> Result<(i64, Vec<(String, DateTime<Utc>)>)> {
    use super::schema::articles::dsl::*;

    let total_count = articles
        .count()
        .get_result::<i64>(pg_connection)
        .map_err(|sql_error| Error::SqlFailed(sql_error))?;

    let total_pages = if total_count == 0 {
        0i64
    } else {
        (total_count - 1) / page_size + 1
    };

    let article_metas = articles
        .select((title, publish_date))
        .order(publish_date.desc())
        .limit(page_size)
        .offset(page_index * page_size)
        .load::<(String, DateTime<Utc>)>(pg_connection)
        .map_err(|sql_error| Error::SqlFailed(sql_error))?;

    Ok((total_pages, article_metas))
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