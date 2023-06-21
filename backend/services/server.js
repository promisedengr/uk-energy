// usage: node server.js

const express = require('express')
const multer = require('multer')
const app = express()
const path = require('path')
const fs = require('fs')
const port = 5000

// configure file uploads
app.use(require('body-parser').json());

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploaded_files');
  },
  filename(req, file, cb) {
    cb(null, file.originalname);
  }
});

// make the folder where uploads will be kept
if (!fs.existsSync('uploaded_files')) fs.mkdirSync('uploaded_files');

app.post('/uploads', multer({ storage: storage }).any(), function(req, res, next) {
  console.log('uploading', req.files, req.body)
})

// serve the html content on the default route
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'index.html'))
})

// serve the application
app.listen(port, function() {
  console.log(`Example app listening on port ${port}!`)
})