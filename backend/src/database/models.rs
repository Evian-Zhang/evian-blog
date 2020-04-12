use serde::Deserialize;

#[derive(Deserialize)]
pub struct TagMeta {
    name: String,
    last_revise_date: u64,
    article_count: usize
}

#[derive(Deserialize)]
pub struct Tag {
    name: String,
    articles: Vec<ArticleMeta>
}

#[derive(Deserialize)]
pub struct SeriesMeta {
    name: String,
    last_revise_date: u64,
    article_count: usize
}

#[derive(Deserialize)]
pub struct Series {
    name: String,
    articles: Vec<ArticleMeta>
}

#[derive(Deserialize)]
pub struct ArticleMeta {
    title: String,
    publish_date: u64,
    last_revise_date: u64,
    tags: Vec<String>,
    series: Option<String>,
    series_index: Option<usize>
}

#[derive(Deserialize)]
pub struct Article {
    title: String,
    body: String,
    publish_date: u64,
    last_revise_date: u64,
    tags: Vec<String>,
    series: Option<String>,
    series_index: Option<usize>
}