type Tag = {
    id: number,
    name: string,
    article_count: string
}

type Article = {
    id: number,
    title: string,
    body: string,
    // unix timestamp
    publish_date: number,
    series_id?: number,
    series_index?: number
}

export type { Tag, Article };