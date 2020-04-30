import getConfig from 'next/config';

const { serverRuntimeConfig } = getConfig();

// Due to https://github.com/zeit/next.js/pull/7651, `process.browser` is deprecated
const ENDPOINT = (typeof window === "undefined") ? serverRuntimeConfig.server_endpoint : serverRuntimeConfig.browser_endpoint;

export { ENDPOINT };