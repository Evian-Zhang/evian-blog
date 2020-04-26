type Tag = {
    name: string,
    articleCount: number,
    // unix timestamp
    lastReviseDate: number
}

type Series = {
    name: string,
    articleCount: number,
    // unix timestamp
    lastReviseDate: number
}

type ArticleMeta = {
    title: string,
    // unix timestamp
    publishDate: number,
    // unix timestamp
    lastReviseDate: number,
    tags: string[],
    series: string | null,
    seriesIndex: number | null
}

type Article = {
    title: string,
    body: string,
    // unix timestamp
    publishDate: number,
    // unix timestamp
    lastReviseDate: number,
    tags: string[],
    series: string | null,
    seriesIndex: number | null
}

export enum FetchStatus {
    Fetching,
    Success,
    Failure
};

export type { Tag, Series, ArticleMeta, Article };