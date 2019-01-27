const textract = require('textract');
const fs = require('fs');

//
// const searchDocumentForKeyword = function searchDocumentForKeyword(filePath, keyword) {
//
//   return new Promise((resolve, reject) => {
//
//     // TODO: filePath.replace('C:\\fakepath\\','');
//
//     textract.fromFileWithPath(filePath, function( error, text ) {
//       if(text !== '' && text != null){
//         let words = text.split(' ');//split apart
//         let keywordFrequency = 0;
//         //search text for keywords...
//         Object.keys(words).forEach(key => {
//           let value = words[key];
//           let lc = value.toLowerCase();
//           //check object for keyword
//           if(lc===keyword){
//             keywordFrequency+=1;//increment frequency counter
//           }
//         });
//         //reportCount(filePath, keywordFrequency);
//         if(keywordFrequency > 1) {
//           fileList.push(filePath);
//           console.log(filePath);
//         } else {
//           console.log('Keyword: ' + keyword + ' not found in ' + filePath);
//         }
//       }else{
//         console.log('ARE WE GETTING HERE');
//         resolve(fileList);
//       }
//     });
//   });
// };


let running = -1;
const doProgram = function(kw) {
  //wrapped in a promise
  return new Promise((resolve, reject) => {

    let filesWithKeyword = [];

    //where the uploads go
    let directory = '../api/public/docs/';

    //read each file
    fs.readdir(directory, (err, files) => {
      running = files.length;//set running to amount of files left
      // console.log(files);
      let pathsCounter = 0;
      files.forEach(file => {
        //search the document for
        let fp = directory + file;
        // console.log(fp);
        textract.fromFileWithPath(fp, function( error, text ) {
          pathsCounter++;
          let words = text.split(' ');//split apart
          //search text for keywords...
          Object.keys(words).forEach(key => {
            let value = words[key];
            let lc = value.toLowerCase();
            //check object for keyword
            if(lc===kw){
              filesWithKeyword.push(fp);
            }
          });
          if (pathsCounter>=files.length){
            console.log('Resolved filepath : ',fp);
            resolve(filesWithKeyword);
          }
        });
      });
    });
  });
};

module.exports.doProgram = doProgram;
