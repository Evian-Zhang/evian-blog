type Tag = {
    id: number,
    name: string,
    article_count: string
}

type Article = {
    id: number,
    title: string,
    body: string,
    publish_date: Date,
    series_id?: number,
    series_index?: number
}

async function toArticle(response: Response): Promise<Article> {
    const text = await response.text();
    const article = JSON.parse(text, (key, value) => {
        if (key === "publish_date") {
            // create a new JavaScript Date object based on he timestamp multiplied by 1000 so that the argument is in milliseconds, not seconds
            return new Date(value * 1000);
        }
    });
    return Promise.resolve(article);
}

async function toArticles(response: Response): Promise<Article[]> {
    const text = await response.text();
    const articles = JSON.parse(text, (key, value) => {
        if (key === "publish_date") {
            // create a new JavaScript Date object based on he timestamp multiplied by 1000 so that the argument is in milliseconds, not seconds
            return new Date(value * 1000);
        }
    });
    return Promise.resolve(articles);
}

export type { Tag, Article };
export { toArticle, toArticles };