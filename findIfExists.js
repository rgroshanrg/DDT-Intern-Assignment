/*

Run this file with command : node rename.js [path-of-sub-directory] [filename-to-find]

Example : node findIfExists.js testdir/ mnb.txt

*/

const fs = require('fs');
const path = require('path');

const dirName = process.argv[2];
const fileName = process.argv[3];
const _dir = path.join(__dirname, dirName);

var isPresent = false;

function checkIfPresent(_dir) {
    fs.readdirSync(_dir).forEach(file => {
        const present = path.join(_dir, file);
        if(fs.statSync(present).isDirectory()) {
            checkIfPresent(present);                // Recursively calling if it is again directory
        } else if(String(file) === fileName) {
            isPresent = true;                       // if filename is same, then returns
            return;
        }                
    })
}

checkIfPresent(_dir);
console.log(isPresent);


