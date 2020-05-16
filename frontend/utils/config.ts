import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();

// Due to https://github.com/zeit/next.js/pull/7651, `process.browser` is deprecated
const BASE_ENDPOINT = (typeof window === "undefined") ? publicRuntimeConfig.serverEndpoint : publicRuntimeConfig.browserEndpoint;
console.log(publicRuntimeConfig);
const API_ENDPOINT = new URL("api/v1/", BASE_ENDPOINT);
const WRITINGS_ENDPOINT = new URL("writings/", API_ENDPOINT.href);
const PROJECTS_ENDPOINT = new URL("projects", API_ENDPOINT.href);
const RESUME_ENDPOINT = new URL("resume", API_ENDPOINT.href);

const ENDPOINTS = {
    writings: {
        article: {
            getArticleCount: new URL("article/count", WRITINGS_ENDPOINT.href),
            getArticleMetas: function (pageIndex: number, pageSize: number) {
                return new URL(`articles?pageIndex=${pageIndex}&pageSize=${pageSize}`, WRITINGS_ENDPOINT.href);
            },
            getArticle: function (articleTitle: string) {
                return new URL(`article/${articleTitle}`, WRITINGS_ENDPOINT.href);
            },
            getArticleTitles: new URL("articles/titles", WRITINGS_ENDPOINT.href)
        },
        tag: {
            getTags: new URL("tags", WRITINGS_ENDPOINT.href),
            getArticlesCountOfTag: function (tagName: string) {
                return new URL(`tag/${tagName}/count`, WRITINGS_ENDPOINT.href);
            },
            getArticlesOfTag: function (tagName: string, pageIndex: number, pageSize: number) {
                return new URL(`tag/${tagName}?pageIndex=${pageIndex}&pageSize=${pageSize}`, WRITINGS_ENDPOINT.href);
            }
        },
        series: {
            getSeries: new URL("series", WRITINGS_ENDPOINT.href),
            getArticlesCountOfSeries: function (seriesName: string) {
                return new URL(`series/${seriesName}/count`, WRITINGS_ENDPOINT.href)
            },
            getArticlesOfSeries: function (seriesName: string, pageIndex: number, pageSize: number) {
                return new URL(`series/${seriesName}?pageIndex=${pageIndex}&pageSize=${pageSize}`, WRITINGS_ENDPOINT.href);
            }
        }
    },
    projects: {
        getProjects: PROJECTS_ENDPOINT
    },
    resume: {
        getResume: RESUME_ENDPOINT
    }
};

const IMAGE_BASE_URL = publicRuntimeConfig.imageBaseUrl;

export { ENDPOINTS, IMAGE_BASE_URL };