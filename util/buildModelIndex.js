#!/usr/bin/env node
'use strict';
var fs = require('fs');
var path = require('path');

// This NodeJS script lists out the available sample models.

function main() {
    var args = process.argv;
    var sampleModelFolder = path.join(args[1], '../../glTF-Sample-Models/2.0');

    console.warn('Scanning: ' + sampleModelFolder);
    var modelIndex = [];
    var files = fs.readdirSync(sampleModelFolder);
    files.forEach(function(file) {
        var fullPath = path.join(path.join(sampleModelFolder, file), 'glTF/' + file + '.gltf');
        if (fs.existsSync(fullPath)) {
            modelIndex.push({
                name: file,
                file: file + '.gltf',
                path: 'glTF-Sample-Models/2.0/' + file + '/glTF/'
            });
        } else if (file !== 'README.md') {
            console.warn('Not found: ' + fullPath);
        }
    });

    console.log(JSON.stringify(modelIndex, null, '  '));
}

main();
