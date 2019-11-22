let http = require("http");
let url = require("url");
let fs = require('fs');
let path = require('path');
const db = require("./sqlite-config");



const server = http.createServer(function(req, res) {

    // //console.log(req.url);
    // let parsedURL = url.parse(req.url, true);
    // let path = parsedURL.pathname;
    // // parsedURL.pathname  parsedURL.query
    // // standardize the requested url by removing any '/' at the start or end
    // // '/folder/to/file/' becomes 'folder/to/file'
    // path = path.replace(/^\/+|\/+$/g, "");
    // console.log(path);
    // let qs = parsedURL.query;
    // let headers = req.headers;
    // let method = req.method.toLowerCase();

    // req.on("data", function() {
    //     console.log("got some data");
    //     //if no data is passed we don't see this messagee
    //     //but we still need the handler so the "end" function works.
    // });
    // req.on("end", function() {
    //     //request part is finished... we can send a response now
    //     console.log("send a response");
    //     //we will use the standardized version of the path
    //     let route =
    //     typeof routes[path] !== "undefined" ? routes[path] : routes["notFound"];
    //     let data = {
    //     path: path,
    //     queryString: qs,
    //     headers: headers,
    //     method: method
    //     };
    //     //pass data incase we need info about the request
    //     //pass the response object because router is outside our scope
    //     route(data, res);
    // });

    // res.setHeader('Content-Type', 'text/html');
    // res.setHeader('Content-Type', 'text/css');
    // res.setHeader('X-Foo', 'bar');
    // res.writeHead(200, {
    //     'Content-Type': 'text/html',
    //     // 'Content-Type': 'text/css',
    // });
    

    var url = req.url; 
      
    if(url ==='/') { 
        
        res.writeHead(200, {
            'Content-Type': 'text/html',
        });
        fs.readFile('./views/main.html', null, function (error, data) {
            if (error) {
                res.writeHead(404);
                res.write('Whoops! File not found!');
            } else {
                res.write(data);
            }
            res.end();
        }); 
    } 
    else if(url ==='/insert') { 
        res.writeHead(200, {
            'Content-Type': 'text/html',
            
        });
        fs.readFile('./views/insert.html', null, function (error, data) {
            if (error) {
                res.writeHead(404);
                res.write('Whoops! File not found!');
            } else {
                res.write(data);
            }
            res.end();
        });   
    } 
    else if(url ==='/edit') { 
        fs.readFile('./views/index.html', null, function (error, data) {
            if (error) {
                res.writeHead(404);
                res.write('Whoops! File not found!');
            } else {
                res.write(data);
            }
            res.end();
        });    
    } 
    else { 
        res.write('Hello World!');  
        res.end();  
    } 
    
    
});


server.listen(1234, function() {
  console.log("Listening on port 1234");
});


