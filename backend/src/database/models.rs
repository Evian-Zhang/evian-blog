use serde::{Serialize, Deserialize};

#[derive(Serialize, Deserialize)]
#[serde(rename_all(serialize = "camelCase"))]
pub struct TagMeta {
    name: String,
    last_revise_date: u64,
    article_count: usize
}

#[derive(Serialize, Deserialize)]
#[serde(rename_all(serialize = "camelCase"))]
pub struct SeriesMeta {
    name: String,
    last_revise_date: u64,
    article_count: usize
}

#[derive(Serialize, Deserialize)]
#[serde(rename_all(serialize = "camelCase"))]
pub struct ArticleMeta {
    title: String,
    publish_date: u64,
    last_revise_date: u64,
    tags: Vec<String>,
    series: Option<String>,
    series_index: Option<usize>
}

#[derive(Serialize, Deserialize)]
#[serde(rename_all(serialize = "camelCase"))]
pub struct ArticleMetaWithPagination {
    pub page_count: usize,
    pub article_metas: Vec<ArticleMeta>
}

#[derive(Serialize, Deserialize)]
#[serde(rename_all(serialize = "camelCase"))]
pub struct Article {
    title: String,
    body: String,
    publish_date: u64,
    last_revise_date: u64,
    tags: Vec<String>,
    series: Option<String>,
    series_index: Option<usize>
}