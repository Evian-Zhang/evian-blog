use chrono::{DateTime, Utc};
use serde::Serialize;

// Using `#[derive(Queryable)]` assumes that the order of fields on the target struct matches the columns in the corresponding table, so make sure to define them in the order seen in the `schema.rs` file
#[derive(Queryable, Serialize)]
pub struct Tag {
    pub id: i32,
    pub name: String,
    pub article_count: i32,
}

#[derive(Queryable)]
pub struct Series {
    pub id: i32,
    pub name: String,
}

#[derive(Queryable, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct Article {
    pub id: i32,
    pub title: String,
    pub body: String,
    #[serde(with = "my_date_format")]
    pub publish_date: DateTime<Utc>,
    pub series_id: Option<i32>,
    pub series_index: Option<i32>,
}

#[derive(Queryable)]
pub struct TagWithArticle {
    pub tag_id: usize,
    pub article_id: usize,
}

mod my_date_format {
    use chrono::{DateTime, Utc};
    use serde::{self, Serializer};

    pub fn serialize<S>(date: &DateTime<Utc>, serializer: S) -> Result<S::Ok, S::Error>
        where
            S: Serializer {
        serializer.serialize_i64(date.timestamp())
    }
}