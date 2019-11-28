const http = require("http");
const fs = require("fs");
const _ = require("underscore");
const db = require("./sqlite-config");
const { parse } = require('querystring');
const PORT = 3000;

const server = http.createServer((req, res) => {
    let url = req.url;
    // membaca file csv
    if (url === "/csv") {
        fs.readFile("./views/csv.html", "utf-8", (error, data) => {
            if (error) {
                res.writeHead(404);
                res.write("Whoops! File not found!");
            } else {
                let FILE_NAME = "./db/judges.json";

                fs.readFile(FILE_NAME, (error, success) => {
                    if (error) {
                        console.log("Async Read: NOT successful! :(");
                        console.log(error);
                    } else {
                        try {
                            const dataJson = JSON.parse(success);
                            let compiled = _.template(data);
                            let htmlToStr = compiled({
                                dataJson
                            });
                            res.writeHead(200, {
                                "Content-Type": "text/html"
                            });
                            res.end(htmlToStr);
                        } catch (error) {
                            console.log(error);
                        }
                    }
                });
            }
        });
    } 
    else if (url === "/") {
        res.writeHead(200, {
            "Content-Type": "text/html"
        });
        fs.readFile("./views/main.html", "utf-8", (error, data) => {
            if (error) {
                res.writeHead(404);
                res.write("Whoops! File not found!");
            } else {
                db.all("SELECT * FROM judges_list", (err, rows) => {
                    let compiled = _.template(data)
                    let htmlToStr = compiled({
                        rows
                    })
                    res.end(htmlToStr) // ngebaca tanda <% %>
                });
            }
        });
    }
    else if (url === "/insertjudges/insert") {
        fs.readFile("./views/insert.html", "utf-8", (error, data) => {
            if (error) {
                res.writeHead(404);
                res.write("Whoops! File not found!");
            } else {
                res.write(data);
            }
            res.end();
        });
    }
    else if (url === "/edit") {
        fs.readFile("./views/edit.html", null, function (error, data) {
            if (error) {
                res.writeHead(404);
                res.write("Whoops! File not found!");
            } else {
                res.write(data);
            }
            res.end();
        });
    } 

    else if (req.method === 'POST' && url === '/insert') (data) => {
        console.log(data);
        collectRequestData(req, result => {
            console.log(result);
            // res.end(`Parsed data belonging to ${result.fname}`);
            
            let query = "INSERT INTO judges_list (code, nama, instansi, telp, email) VALUES ('${code}','${nama}','${instansi}' ,${telp}, '${email}')"
            db.run(query, (err,rows) => {
                let compiled = _.template(data)
                let htmlToStr = compiled({
                    rows
                })
                res.end(htmlToStr) // ngebaca tanda <% %>
            })
        });
    } 
    
    else {
        res.write("page not found");
        res.end();
    }

    
});

server.listen(PORT, function () {
    console.log("Listening on port http://localhost:"+ PORT);
});

function collectRequestData(request, callback) {
    const FORM_URLENCODED = 'application/x-www-form-urlencoded';
    if(request.headers['content-type'] === FORM_URLENCODED) {
        let body = '';
        request.on('data', chunk => {
            body += chunk.toString();
        });
        request.on('end', () => {
            callback(parse(body));
        });
    }
    else {
        callback(null);
    }
}