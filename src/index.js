const { loadConfig } = require("./config");
const { loadStaticFilePaths } = require("./file-paths");
const { serveStaticFiles } = require("./file-serve");

module.exports = {
    loadConfig,
    loadStaticFilePaths,
    serveStaticFiles
}