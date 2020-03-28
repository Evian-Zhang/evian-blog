import { ENDPOINT } from '../utils/config'

import fetch from 'node-fetch'

async function getSeries(): Promise<string[]> {
    const res = await fetch(ENDPOINT + '/api/v1/series');
    if (res.status !== 200) {
        return Promise.reject(res.statusText);
    }
    const data = await res.json();
    return Promise.resolve(data);
}

async function getArticlesOfSeries(seriesName: string): Promise<string[]> {
    const res = await fetch(ENDPOINT + '/api/v1/series/' + seriesName);
    if (res.status !== 200) {
        return Promise.reject(res.statusText);
    }
    const data = await res.json();
    return Promise.resolve(data);
}

export { getSeries, getArticlesOfSeries };