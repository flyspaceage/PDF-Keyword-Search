/*(https://medium.com/@_aerdeljac/file-upload-with-node-js-react-js-686e342ad7e7)*/
const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const cors = require('cors');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(fileUpload());
app.use('/public', express.static(__dirname + '/public'));

//handle upload for documents in FileUpload
app.post('/upload', (req, res, next) => {
  // console.log(req);
  let filePath = req.files.file;

  filePath.mv(`${__dirname}/public/docs/${req.body.filename}`, function(err) {//TODO:fakepath
    if (err) {
      return res.status(500).send(err);
    }
    res.json({file: `public/docs/${req.body.name}`});
  });
});

//save user input from KeywordInput | pass keyword() to getText.js
app.post("/keyword", function(req, res){
   let keyword = req.body.keyword;
   console.log("Post Received:%s", keyword);
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(8000, () => {
  console.log('8000');
});

module.exports = app;
