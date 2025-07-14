const fs = require('node:fs');
const path = require('node:path');
const { cwd } = require('node:process');

let mimeTypes = {};
let staticDir = '/';
let staticFilePaths = [];

exports.loadFileServeConfig = (config) => {
    mimeTypes = config['mimeTypes'];
    staticDir = config['staticDir'];
    staticFilePaths = config['staticFilePaths']
}

exports.isStaticFile = (filePath='') => {
    return staticFilePaths.includes(filePath.toLowerCase());
}

exports.serveStaticFiles = (filePath, res, staticPath=staticDir) => {
    fs.readFile(path.join(cwd(), staticPath, filePath), (err, content) => {
        if(err){
            res.writeHead(404);
            res.end('Not found');
            return true;
        }
        const extension = path.extname(filePath);
        const contentType = mimeTypes[extension] || 'application/octet-stream';

        res.writeHead(200, { 'Content-Type': contentType });
        res.end(content);
        return true;
    })
}