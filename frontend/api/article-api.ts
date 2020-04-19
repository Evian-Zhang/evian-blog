import { ENDPOINT } from '../utils/config'
import { Article, ArticleMetasWithPagination } from '../interfaces'

import fetch from 'node-fetch'

async function getArticleMetas(pageIndex: number, pageSize: number): Promise<ArticleMetasWithPagination> {
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

export { getArticle, getArticleMetas };
