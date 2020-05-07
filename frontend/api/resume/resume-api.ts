import { ENDPOINTS } from '../../utils/config';

import fetch from 'node-fetch';

async function getProjects(): Promise<string> {
    const res = await fetch(ENDPOINTS.resume.getResume);
    if (res.status !== 200) {
        return Promise.reject({ statusCode: res.statusCode, statusText: res.statusText });
    }
    const data = await res.json();
    return Promise.resolve(data);
}

export { getProjects }