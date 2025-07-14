const fs = require('node:fs');
const path = require('node:path');
const config = require('./config');

let staticDir = '/';

exports.loadFilePathConfig = (config) => {
    staticDir = config['staticDir'];
}

exports.loadStaticFilePaths = async (currPath, appPath, dirName=staticDir) => {
    const staticFilePaths = await this._loadStaticFilePaths(currPath, appPath, dirName);
    config.setConfig('staticFilePaths', staticFilePaths);
}

exports._loadStaticFilePaths = (currPath, appPath, dirName=staticDir) => {
    return new Promise((resolve, reject) => {
        const staticFilePaths = [];
        fs.readdir(path.join(currPath, dirName), async (err, list) => {
            if(err){
                reject(err);
            }

            if(Array.isArray(list)){
                for(const fileOrDirName of list){
                    const fileOrDirPath = path.resolve(currPath, dirName, fileOrDirName);
                    const isDirectory = fs.statSync(fileOrDirPath).isDirectory();
                    const newAppPath = (!appPath || appPath === '/') ? appPath+fileOrDirName : (appPath+'/'+fileOrDirName); 

                    if(isDirectory){
                        try{
                            const childStaticFilePaths = await this._loadStaticFilePaths(path.join(currPath, dirName), newAppPath, fileOrDirName);
                            
                            staticFilePaths.push(...childStaticFilePaths);
                        }
                        catch(_err) {
                            reject(_err);
                        }
                    }
                    else {
                        staticFilePaths.push(newAppPath);
                    }
                }
            }
            resolve(staticFilePaths);
        })
    });
}