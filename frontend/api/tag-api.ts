import { ENDPOINT } from '../utils/config';
import { Tag, ArticleMeta } from '../interfaces';

import fetch from 'node-fetch';

async function getTags(): Promise<Tag[]> {
    const res = await fetch(ENDPOINT + '/api/v1/tags');
    if (res.status !== 200) {
        return Promise.reject(res.statusText);
    }
    const data = await res.json();
    return Promise.resolve(data);
}

async function getArticlesCountOfTag(tagName: string): Promise<number> {
    const res = await fetch(ENDPOINT + `/api/v1/tag/${tagName}/count`);
    if (res.status !== 200) {
        return Promise.reject(res.statusText);
    }
    const data = await res.json();
    return Promise.resolve(data);
}

async function getArticlesOfTag(tagName: string, pageIndex: number, pageSize: number): Promise<ArticleMeta[]> {
    const res = await fetch(ENDPOINT + `/api/v1/tag/${tagName}?pageIndex=${pageIndex}&pageSize=${pageSize}`);
    if (res.status !== 200) {
        return Promise.reject(res.statusText);
    }
    const data = await res.json();
    return Promise.resolve(data);
}

export { getTags, getArticlesCountOfTag, getArticlesOfTag };