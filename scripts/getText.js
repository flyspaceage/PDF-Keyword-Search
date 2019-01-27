const textract = require('textract');
const fs = require('fs');


const searchDocumentForKeyword = function(kw) {
  //wrapped in a promise
  return new Promise((resolve, reject) => {
    //initialize keyword results
    let filesWithKeyword = [];
    //where the uploads go
    let directory = '../api/public/docs/';
    //read each file
    fs.readdir(directory, (err, files) => {
      // console.log(files);
      let pathsCounter = 0;
      //search the document for
      files.forEach(file => {
        let fp = directory + file;
        // use textract extract text from various file types
        textract.fromFileWithPath(fp, function( error, text ) {
          pathsCounter++;
          let words = text.split(' ');//split apart
          //search text for keywords...
          Object.keys(words).forEach(key => {
            let value = words[key];
            let lc = value.toLowerCase();
            //check object for keyword
            if(lc===kw){//if keyword matches
              //add the filepath
              filesWithKeyword.push(fp);
            }
          });
          if (pathsCounter>=files.length){
            resolve(filesWithKeyword);
          }
        });
      });
    });
  });
};

module.exports.searchDocumentForKeyword = searchDocumentForKeyword;
