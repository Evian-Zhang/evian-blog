const DEV_ENDPOINT = "http://localhost:8000"
const PROD_ENDPOINT = "http://localhost:8000"

const ENDPOINT = process.env["NODE_ENV"] === "development" ? DEV_ENDPOINT : PROD_ENDPOINT;

export { ENDPOINT };