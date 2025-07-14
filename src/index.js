const { loadConfig } = require("./config");
const { loadStaticFilePaths } = require("./file-paths");
const { serveStaticFiles, isStaticFile } = require("./file-serve");

module.exports = {
    loadConfig,
    loadStaticFilePaths,
    serveStaticFiles,
    isStaticFile
}