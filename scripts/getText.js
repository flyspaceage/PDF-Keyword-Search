const textract = require('textract');
const fs = require('fs');

function reportCount(filePath, keywordFrequency) {
  console.log('Count is : ' + keywordFrequency + ' for ' + filePath);
}

function searchDocumentForKeyword(filePath, keyword) {
  // TODO: filePath.replace('C:\\fakepath\\','');
  textract.fromFileWithPath(filePath, function( error, text ) {
    if(text !== '' && text != null){
      let words = text.split(' ');//split apart
      //search text for keywords...
      let keywordFrequency = 0;
      // test.txt   hello goodbye what how when   (how)
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

    }else{
      console.log('Error:', error);
      return -1;
    }
  });
}

// Wrapped in a promise
new Promise((resolve, reject) => {
  let directory = '../api/public/docs/';
  fs.readdir(directory, (err, files) => {
    // console.log(files);
    files.forEach(file => {
      let fp = directory + file;
      const kw = 'the' //keyword(this.results.filePath);
      searchDocumentForKeyword(fp, kw);
    });
  });
})
