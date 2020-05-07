import getConfig from 'next/config';

const { serverRuntimeConfig } = getConfig();

// Due to https://github.com/zeit/next.js/pull/7651, `process.browser` is deprecated
const BASE_ENDPOINT = (typeof window === "undefined") ? serverRuntimeConfig.server_endpoint : serverRuntimeConfig.browser_endpoint;
const API_ENDPOINT = new URL(BASE_ENDPOINT, "api/v1");
const WRITINGS_ENDPOINT = new URL(API_ENDPOINT.href, "writings");
const PROJECTS_ENDPOINT = new URL(API_ENDPOINT.href, "projects");
const RESUME_ENDPOINT = new URL(API_ENDPOINT.href, "resume");

const ENDPOINTS = {
    writings: {
        article: {
            getArticleCount: new URL(WRITINGS_ENDPOINT.href, "article/count"),
            getArticleMetas: function (pageIndex: number, pageSize: number) {
                return new URL(WRITINGS_ENDPOINT.href, `articles?pageIndex=${pageIndex}&pageSize=${pageSize}`);
            },
            getArticle: function (articleTitle: string) {
                return new URL(WRITINGS_ENDPOINT.href, `article/${articleTitle}`);
            },
            getArticleTitles: new URL(WRITINGS_ENDPOINT.href, "articles/titles")
        },
        tag: {
            getTags: new URL(WRITINGS_ENDPOINT.href, "tags"),
            getArticlesCountOfTag: function (tagName: string) {
                return new URL(WRITINGS_ENDPOINT.href, `tag/${tagName}/count`);
            },
            getArticlesOfTag: function (tagName: string, pageIndex: number, pageSize: number) {
                return new URL(WRITINGS_ENDPOINT.href, `tag/${tagName}?pageIndex=${pageIndex}&pageSize=${pageSize}`);
            }
        },
        series: {
            getSeries: new URL(WRITINGS_ENDPOINT.href, "series"),
            getArticlesCountOfSeries: function (seriesName: string) {
                return new URL(WRITINGS_ENDPOINT.href, `series/${seriesName}/count`)
            },
            getArticlesOfSeries: function (seriesName: string, pageIndex: number, pageSize: number) {
                return new URL(WRITINGS_ENDPOINT.href, `series/${seriesName}?pageIndex=${pageIndex}&pageSize=${pageSize}`);
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

const IMAGE_BASE_URL = serverRuntimeConfig.image_base_url;

export { ENDPOINTS, IMAGE_BASE_URL };