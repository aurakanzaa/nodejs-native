const http = require("http");
const fs = require("fs");
const _ = require("underscore");
const db = require("./sqlite-config");

const server = http.createServer((req, res) => {
    let url = req.url;

    if (url === "/csv") {
        fs.readFile("./views/main.html", "utf-8", (error, data) => {
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
    } else if (url === "/") {
        res.writeHead(200, {
            "Content-Type": "text/html"
        });
        fs.readFile("./views/judges.html", "utf-8", (error, data) => {
            if (error) {
                res.writeHead(404);
                res.write("Whoops! File not found!");
            } else {
                db.all("SELECT * FROM judges_list", (err, rows) => {
                    let compiled = _.template(data)
                    let htmlToStr = compiled({
                        rows
                    })
                    res.end(htmlToStr)
                });
            }
        });
    }
    else if (url === "/insert") {
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
        fs.readFile("./views/index.html", null, function (error, data) {
            if (error) {
                res.writeHead(404);
                res.write("Whoops! File not found!");
            } else {
                res.write(data);
            }
            res.end();
        });
    } else {
        res.write("page not found");
        res.end();
    }
});

server.listen(1234, function () {
    console.log("Listening on port 1234");
});