table! {
    articles (id) {
        id -> Int4,
        title -> Varchar,
        body -> Varchar,
        publish_date -> Timestamptz,
        last_update_date -> Timestamptz,
        series_id -> Nullable<Int4>,
        series_index -> Nullable<Int4>,
    }
}

table! {
    series (id) {
        id -> Int4,
        name -> Varchar,
        last_update_date -> Timestamptz,
    }
}

table! {
    tag_with_articles (tag_id, article_id) {
        tag_id -> Int4,
        article_id -> Int4,
    }
}

table! {
    tags (id) {
        id -> Int4,
        name -> Varchar,
        article_count -> Int4,
        last_update_date -> Timestamptz,
    }
}

joinable!(articles -> series (series_id));
joinable!(tag_with_articles -> articles (article_id));
joinable!(tag_with_articles -> tags (tag_id));

allow_tables_to_appear_in_same_query!(
    articles,
    series,
    tag_with_articles,
    tags,
);
