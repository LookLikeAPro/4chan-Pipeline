'use strict';

const http = require('http');
const fs = require('fs');

function download(url){
  const filename = (url.match(/[^\\/]+\.[^\\/]+$/) || []).pop();
  var file = fs.createWriteStream("public/media/queue/"+filename);
  var request = http.get(url, function(response) {
    response.pipe(file);
  });
}

module.exports = {
  download: download
}
