import { ENDPOINT } from '../utils/config'
import { Series, ArticleMetasWithPagination } from '../interfaces'

import fetch from 'node-fetch'

async function getSeries(): Promise<Series[]> {
    const res = await fetch(ENDPOINT + '/api/v1/series');
    if (res.status !== 200) {
        return Promise.reject(res.statusText);
    }
    const data = await res.json();
    return Promise.resolve(data);
}

async function getArticlesOfSeries(seriesName: string): Promise<ArticleMetasWithPagination> {
    const res = await fetch(ENDPOINT + '/api/v1/series/' + seriesName);
    if (res.status !== 200) {
        return Promise.reject(res.statusText);
    }
    const data = await res.json();
    return Promise.resolve(data);
}

export { getSeries, getArticlesOfSeries };