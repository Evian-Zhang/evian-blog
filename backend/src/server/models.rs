use chrono::{DateTime, Utc};
use serde::Serialize;

#[derive(Serialize)]
#[serde(rename_all = "camelCase")]
pub struct ArticleMeta {
    pub title: String,
    #[serde(with = "my_date_format")]
    pub publish_date: DateTime<Utc>
}

impl ArticleMeta {
    pub fn new(title: String, publish_date: DateTime<Utc>) -> ArticleMeta {
        ArticleMeta {
            title,
            publish_date
        }
    }
}

#[derive(Serialize)]
#[serde(rename_all = "camelCase")]
pub struct ArticleMetasWithPagination {
    pub article_metas: Vec<ArticleMeta>,
    pub total_pages: i64
}

impl ArticleMetasWithPagination {
    pub fn new(article_metas: Vec<ArticleMeta>, total_pages: i64) -> ArticleMetasWithPagination {
        ArticleMetasWithPagination {
            article_metas,
            total_pages
        }
    }
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