type Tag = {
    id: number,
    name: string,
    articleCount: string
}

type ArticleMeta = {
    title: string,
    // unix timestamp
    publishDate: number
}

type ArticleMetasWithPagination = {
    articleMetas: ArticleMeta[],
    totalPages: number
}

type Article = {
    id: number,
    title: string,
    body: string,
    // unix timestamp
    publishDate: number,
    seriesId?: number,
    seriesIndex?: number
}

export type { Tag, ArticleMeta, ArticleMetasWithPagination, Article };