const withWorkers = require('@zeit/next-workers');
module.exports = withWorkers();

const fs = require('fs');
const config_file = process.env["CONFIG_FILE"];
const config = JSON.parse(fs.readFileSync(config_file, 'utf-8'));

module.exports = {
    serverRuntimeConfig: {
        server_endpoint: config.server_endpoint,
        browser_endpoint: config.browser_endpoint,
        image_base_url: config.image_base_url
    }
};