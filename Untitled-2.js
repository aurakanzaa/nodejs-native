let http = require("http");
let url = require("url");
let fs = require('fs');

const server = http.createServer(function(req, res) {

    res.writeHead(200, {
        'Content-Type': 'text/html'
    });
    fs.readFile('./index.html', null, function (error, data) {
        if (error) {
            res.writeHead(404);
            respone.write('Whoops! File not found!');
        } else {
            res.write(data);
        }
        res.end();
    });
    
});


server.listen(1234, function() {
  console.log("Listening on port 1234");
});
