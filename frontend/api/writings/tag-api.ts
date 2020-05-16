import { ENDPOINTS } from 'utils/config';
import { Tag, ArticleMeta } from 'interfaces';

import fetch from 'node-fetch';

async function getTags(): Promise<Tag[]> {
    const res = await fetch(ENDPOINTS.writings.tag.getTags);
    if (res.status !== 200) {
        return Promise.reject(res.statusText);
    }
    const data = await res.json();
    return Promise.resolve(data);
}

async function getArticlesCountOfTag(tagName: string): Promise<number> {
    const res = await fetch(ENDPOINTS.writings.tag.getArticlesCountOfTag(tagName));
    if (res.status !== 200) {
        return Promise.reject(res.statusText);
    }
    const data = await res.json();
    return Promise.resolve(data);
}

async function getArticlesOfTag(tagName: string, pageIndex: number, pageSize: number): Promise<ArticleMeta[]> {
    const res = await fetch(ENDPOINTS.writings.tag.getArticlesOfTag(tagName, pageIndex, pageSize));
    if (res.status !== 200) {
        return Promise.reject(res.statusText);
    }
    const data = await res.json();
    return Promise.resolve(data);
}

export { getTags, getArticlesCountOfTag, getArticlesOfTag };