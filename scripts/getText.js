const textract = require('textract');
const fs = require('fs');


function reportCount(filePath, keywordFrequency) {
  console.log('Count is : ' + keywordFrequency + ' for ' + filePath);
}

let fileList = [];
let countList = [];

const searchDocumentForKeyword = function searchDocumentForKeyword(filePath, keyword) {
  // TODO: filePath.replace('C:\\fakepath\\','');
  textract.fromFileWithPath(filePath, function( error, text ) {
    if(text !== '' && text != null){
      let words = text.split(' ');//split apart
      let keywordFrequency = 0;

      //search text for keywords...
      Object.keys(words).forEach(key => {
        let value = words[key];
        let lc = value.toLowerCase();
        //check object for keyword
        if(lc===keyword){
          keywordFrequency+=1;//increment frequency counter
        }
      });

      //reportCount(filePath, keywordFrequency);
      if(keywordFrequency > 1) {
        //pass the URL to ShowResults
        console.log('Frequency ' + keywordFrequency + ' Filepath: ' + filePath );
      }
      else {
        console.log('Keyword: ' + keyword + ' not found in ' + filePath);
      }

      //once the file is done processing, -1 files, and add results to filelist and countlist
      running -= 1;
      fileList.push(filePath);
      countList.push(keywordFrequency);

    }else{
      console.log('Error:', error);
      running -= 1;
      return -1;
    }
  });
};

let running = -1;
const doProgram = function(kw) {
  // Wrapped in a promise
  new Promise((resolve, reject) => {
    //where the uploads go
    let directory = '../api/public/docs/';
    //read each file
    fs.readdir(directory, (err, files) => {
      running = files.length;
      // console.log(files);
      files.forEach(file => {
        //search the document for
        let fp = directory + file;
        searchDocumentForKeyword(fp, kw);
      });
    });
  });
};

const getResults = function() {
  if(running === 0) {
    // return result of keyword search (lists?)
    console.log('FileList: ', fileList);
    console.log('CountList: ', countList);
  }
  else if(running === -1) {
    // hasn't started or already finished
  }
  else {
    //still processing, return False
  }
};

// const keyword = function keyword(kw) {
//   let k = kw;
//   return k;
// }

// module.exports.keyword = keyword;
module.exports.searchDocumentForKeyword = searchDocumentForKeyword;
module.exports.doProgram = doProgram;
