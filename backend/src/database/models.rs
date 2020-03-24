use chrono::{DateTime, Utc};

// Using `#[derive(Queryable)]` assumes that the order of fields on the target struct matches the columns in the corresponding table, so make sure to define them in the order seen in the `schema.rs` file
#[derive(Queryable)]
pub struct Tag {
    pub id: usize,
    pub name: String,
}

#[derive(Queryable)]
pub struct Series {
    pub id: usize,
    pub name: String,
}

#[derive(Queryable)]
pub struct Article {
    pub id: usize,
    pub title: String,
    pub body: String,
    pub publish_date: DateTime<Utc>,
    pub last_revise_date: DateTime<Utc>,
    pub series_id: Option<usize>,
    pub series_index: Option<usize>,
}

#[derive(Queryable)]
pub struct TagWithArticle {
    pub tag_id: usize,
    pub article_id: usize,
}