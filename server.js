const express = require('express');
const fileManager = require('file-manager-js');
const path = require('path');
const fs = require('fs');
const cors = require('cors');
const expressVideo = require('express-video');
const ffprobe = require('ffprobe');
const ffprobeStatic = require('ffprobe-static');
const FileType = require('file-type');
const mime = require('mime-types');

const app = express();
const port = process.env.PORT || 3000;
const basePath = './data/';

app.use(cors());
app.use(express.static('public'));
app.use('/videojs-overlay', express.static(__dirname + '/node_modules/videojs-overlay/dist/'));

app.get('/', (req, res) => res.send('Welcome to Elgin Video POC!'));

app.get('/videos/:fileName', function (req, res) {
  const fileName = req.params.fileName;
  const fullPath = basePath + fileName;
  const stat = fs.statSync(fullPath);
  const total = stat.size;

  if (req.headers['range']) {
    var range = req.headers.range;
    var parts = range.replace(/bytes=/, "").split("-");
    var partialstart = parts[0];
    var partialend = parts[1];

    var start = parseInt(partialstart, 10);
    var end = partialend ? parseInt(partialend, 10) : total - 1;
    var chunksize = (end - start) + 1;
    console.log('RANGE: ' + start + ' - ' + end + ' = ' + chunksize);

    var file = fs.createReadStream(fullPath, {start: start, end: end});
    res.writeHead(206, {
      'Content-Range': 'bytes ' + start + '-' + end + '/' + total,
      'Accept-Ranges': 'bytes',
      'Content-Length': chunksize,
      'Content-Type': 'video/mp4'
    });
    file.pipe(res);
  } else {
    console.log('ALL: ' + total);
    res.writeHead(200, {'Content-Length': total, 'Content-Type': 'video/mp4'});
    fs.createReadStream(fullPath).pipe(res);
  }
});

app.get('/video-list', (req, res) => {
  const folder = './data/';
  const videoExtensions = ['mp4'];

  fileManager.listDeep(folder)
    .then((entries) => {
      let videoFilePaths = [];
      entries.files.forEach((filePath) => {
        videoExtensions.forEach((ext) => {
          if (filePath.endsWith(ext)) {
            let relativeFilePath = filePath.replace('data/', '');
            let jsonFile = folder + relativeFilePath;
            jsonFile = jsonFile.replace('.mp4', '.json');
            const json = require(jsonFile);
            videoFilePaths.push({video: relativeFilePath, data: json});
          }
        });
      });
      // console.log(videoFilePaths);
      res.send(videoFilePaths);
    })
    .catch((error) => {
      console.log(error);
      res.send('error getting files');
    });
});

app.listen(port, () => console.log(`Backend listening on port ${port}!`));
