import { ENDPOINT } from '../utils/config';
import { Article, ArticleMeta } from '../interfaces';

import fetch from 'node-fetch';

async function getArticlesCount(): Promise<number> {
    const res = await fetch(ENDPOINT + `/api/v1/articles/count`);
    if (res.status !== 200) {
        return Promise.reject({ statusCode: res.statusCode, statusText: res.statusText });
    }
    const data = await res.json();
    return Promise.resolve(data);
}

async function getArticleMetas(pageIndex: number, pageSize: number): Promise<ArticleMeta[]> {
    const res = await fetch(ENDPOINT + `/api/v1/articles?pageIndex=${pageIndex}&pageSize=${pageSize}`);
    if (res.status !== 200) {
        return Promise.reject({ statusCode: res.statusCode, statusText: res.statusText });
    }
    const data = await res.json();
    return Promise.resolve(data);
}

async function getArticle(articleTitle: string): Promise<Article> {
    const res = await fetch(ENDPOINT + '/api/v1/article/' + articleTitle);
    if (res.status != 200) {
        return Promise.reject({ statusCode: res.statusCode, statusText: res.statusText });
    }
    const data = await res.json();
    return Promise.resolve(data);
}

async function getArticleTitles(): Promise<string[]> {
    const res = await fetch(ENDPOINT + '/api/v1/articles/titles');
    if (res.status != 200) {
        return Promise.reject({ statusCode: res.statusCode, statusText: res.statusText });
    }
    const data = await res.json();
    return Promise.resolve(data);
}

export { getArticle, getArticlesCount, getArticleMetas, getArticleTitles };
