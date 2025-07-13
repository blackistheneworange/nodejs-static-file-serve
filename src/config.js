const fs = require('node:fs');
const filePaths = require('./file-paths');
const fileServe = require('./file-serve');

const config = {};

exports.loadConfig = (configFilePath='static-config.json') => {
    return new Promise((resolve, reject) => {
        fs.readFile(configFilePath, (err, content) => {
            if(err){
                reject('Static config file not found');
                return;
            }
            const parsed = JSON.parse(content.toString());
            config['mimeTypes'] = parsed['MIME_TYPES'];
            config['staticDir'] = parsed['STATIC_DIR'];

            filePaths.loadFilePathConfig(config);
            fileServe.loadFileServeConfig(config);
            resolve();
        })
    })
}