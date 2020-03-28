import { ENDPOINT } from '../utils/config'
import { Tag } from '../interfaces'

import fetch from 'node-fetch'

async function getTags(): Promise<Tag[]> {
    const res = await fetch(ENDPOINT + '/api/v1/tags');
    if (res.status !== 200) {
        return Promise.reject(res.statusText);
    }
    const data = await res.json();
    return Promise.resolve(data);
}

async function getArticlesOfTag(tagName: string): Promise<string[]> {
    const res = await fetch(ENDPOINT + '/api/v1/tag/' + tagName);
    if (res.status !== 200) {
        return Promise.reject(res.statusText);
    }
    const data = await res.json();
    return Promise.resolve(data);
}

export { getTags, getArticlesOfTag };