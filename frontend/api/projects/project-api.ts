import { ENDPOINTS } from 'utils/config';
import { Project } from 'interfaces';

import fetch from 'node-fetch';

async function getProjects(): Promise<Project> {
    const res = await fetch(ENDPOINTS.projects.getProjects);
    if (res.status !== 200) {
        return Promise.reject({ statusCode: res.statusCode, statusText: res.statusText });
    }
    const data = await res.json();
    return Promise.resolve(data);
}

export { getProjects }