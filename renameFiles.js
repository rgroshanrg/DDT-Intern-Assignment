/*
Run this file with command : node rename.js [path-of-sub-directory]

Example : node renameFiles.js testdir/

*/

const fs = require('fs');
const path = require('path');
var crypto = require('crypto');

const dirName = process.argv[2];    // sub folder path, passed by command line
const _dir = path.join(__dirname, dirName);     // joins the current path of codefile and dirName

fs.readdir(_dir, (err, files) => {
    if(err) {
        console.log(err);
    } else {
        files.forEach(file => {
            var fileName = String(file);
            var randomId = crypto.randomBytes(8).toString('hex');
            let oldFileName = _dir + fileName;
            let newFileName = _dir + 'New___' + fileName.split('.')[0] + '___' + randomId + '.' + fileName.split('.')[1];
            fs.rename(oldFileName , newFileName, (err) => {
                if(err)
                    console.log(err);
            })
        });
    }    
})

