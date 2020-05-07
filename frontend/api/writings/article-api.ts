import { ENDPOINTS } from '../../utils/config';
import { Article, ArticleMeta } from '../../interfaces';

import fetch from 'node-fetch';

async function getArticlesCount(): Promise<number> {
    const res = await fetch(ENDPOINTS.writings.article.getArticleCount);
    if (res.status !== 200) {
        return Promise.reject({ statusCode: res.statusCode, statusText: res.statusText });
    }
    const data = await res.json();
    return Promise.resolve(data);
}

async function getArticleMetas(pageIndex: number, pageSize: number): Promise<ArticleMeta[]> {
    const res = await fetch(ENDPOINTS.writings.article.getArticleMetas(pageIndex, pageSize));
    if (res.status !== 200) {
        return Promise.reject({ statusCode: res.statusCode, statusText: res.statusText });
    }
    const data = await res.json();
    return Promise.resolve(data);
}

async function getArticle(articleTitle: string): Promise<Article> {
    const res = await fetch(ENDPOINTS.writings.article.getArticle(articleTitle));
    if (res.status != 200) {
        return Promise.reject({ statusCode: res.statusCode, statusText: res.statusText });
    }
    const data = await res.json();
    return Promise.resolve(data);
}

async function getArticleTitles(): Promise<string[]> {
    const res = await fetch(ENDPOINTS.writings.article.getArticleTitles);
    if (res.status != 200) {
        return Promise.reject({ statusCode: res.statusCode, statusText: res.statusText });
    }
    const data = await res.json();
    return Promise.resolve(data);
}

export { getArticle, getArticlesCount, getArticleMetas, getArticleTitles };
