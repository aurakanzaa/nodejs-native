const fs = require('fs');
const path = require('path');
const mime = require('mime');
// const _ = require("underscore");

const staticServer = function (res, pathname) {
  fs.readFile(__dirname + '/..' + pathname, 'utf8', function (err, data) {
    if (err) {
      return res.end(err.message);
    }
    // Read the file, parse the json, and then find the corresponding mime Content-Type according to the corresponding extension
    let mimeType = mime.getType(pathname);
    // Handling text
    if (mimeType.startsWith('text/')) {
        mimeType += '; charset=utf-8';
    }
    res.writeHead(200, {
        'Content-Type': mimeType
    });
    res.end(data);
  });
}

module.exports = staticServer;