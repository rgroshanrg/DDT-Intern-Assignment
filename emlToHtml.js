/*
default HTML file name : abc.html
default image file name (attachments) : 0.jpg, 1.jpg, 2.jpg ...

How to Run : 
    ->  Change EmlFilename
    -> node emltoHtml.js

NOTE : It uses external npm library, make sure to install it (npm i eml-parser).
*/


const EmlParser = require('eml-parser');
const fs = require('fs');

var imgFilename = [];       // Array to store image file name

var EmlFilename = 'Hey.eml';        // Eml file name (change it if required)

new EmlParser(fs.createReadStream(EmlFilename))
.parseEml()
.then(result  => {
    var i = 0;
	result.attachments.forEach(cnt => {
        if(cnt.contentType == 'image/jpeg' || cnt.contentType == 'image/png') {
            imgFilename.push(String(i) + '.jpg');
            fs.writeFileSync(String(i) + '.jpg', cnt.content);
        }
    });
}).then(a => {
    new EmlParser(fs.createReadStream(EmlFilename))
    .getEmailAsHtml()
    .then(htmlString  => {
    	fs.writeFileSync('abc.html',htmlString)	;
        fs.appendFile('abc.html', '<h1> Attachments : </h1>', function (err) {
            if (err) throw err;
          })
    }).then(ab => {
        imgFilename.forEach(imgName => {
            fs.appendFile('abc.html', '<img src="' + imgName + '"width="500" height="600">', function (err) {
                if (err) throw err;
              })
        })            
      })
    .catch(err  => {
    	console.log(err);
    })
})
.catch(err  => {
	console.log(err);
})
