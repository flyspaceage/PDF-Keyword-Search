'use strict';
const fs = require('fs');
const util = require('util');//promisfy
const textract = require('textract');

const path = require('path');
const bodyParser = require('body-parser');

const express = require('express');
const app = express();

app.use(express.static(path.join(__dirname, 'public')));

function reportCount(filePath, keywordFrequency) {
  console.log('Count is: ' + keywordFrequency + ' for ' + filePath);
}

function getKeywords(filePath, keyword) {
  textract.fromFileWithPath(filePath, function( error, text ) {
    if(text !== '' && text != null){
      let words = text.split(' ');//split apart
      //search text for keywords...
      let keywordFrequency = 0;
      Object.keys(words).forEach(key => {
        let value = words[key];
        //check object for keyword
        if(value===keyword){
          keywordFrequency+=1;//increment frequency counter
          //console.log('match');
        }
      });

      reportCount(filePath, keywordFrequency);

    }else{
      console.log('Error:', error);
      return -1;
    }
  });
}


app.get('/words', function(req, res) {
  let directory = 'docs/';

  const readdir = util.promisify(fs.readdir);

  readdir(directory).then((files) => {
    files.forEach(file => {
      let fp = directory + file;
      const kw = 'and';//temp value
      getKeywords(fp, kw);
    });
  }).catch((err) => {
      console.log(err);
  });

  /*BLOCKING*/
  // let filePath = 'docs/input.txt';
  // let fileContent = fs.readFileSync(filePath, 'utf8');
  // return res.send("Files content: " + fileContent);

  /*OG*/
  // let resp = '';
  // let directory = '/docs/';
  // fs.readdir(directory, (err, files) => {
  //   console.log(files);//returns undefined
  //
    // files.forEach(file => {
    //   let fp = directory + file;
    //   const kw = 'and';//temp value
    //   getKeywords(fp, kw);
    // });
  // });
  // return res.send("Word count: " + resp);
});


app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'public/', 'index.html'));
});

app.listen(process.env.PORT || 8080);
