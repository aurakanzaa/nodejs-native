const http = require("http");
const https = require("https");
const fs = require("fs");
var ur = require('url');
const _ = require("underscore");
const db = require("./sqlite-config");
const { parse } = require("querystring");
const PORT = 3001;

// ara nambahin
const current_url = new URL("http://localhost:3000/edit?no=23");
const pathname = current_url.pathname;
const search_params = current_url.searchParams;

const server = http.createServer((req, res) => {
  let url = req.url;
  let url_split = url.split('/');

  //console.log(url_split);
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
  } else if (url === "/") {
    res.writeHead(200, {
      "Content-Type": "text/html"
    });
    fs.readFile("./views/main.html", "utf-8", (error, data) => {
      if (error) {
        res.writeHead(404);
        res.write("Whoops! File not found!");
      } else {
        db.all("SELECT * FROM judges_list", (err, rows) => {
          let compiled = _.template(data);
          let htmlToStr = compiled({
            rows
          });
          res.end(htmlToStr);
        });
      }
    });
  } else if (url === "/insert") {
    fs.readFile("./views/insert.html", "utf-8", (error, data) => {
      if (error) {
        res.writeHead(404);
        res.write("Whoops! File not found!");
      } else {
        if (req.method === "POST") {
          collectRequestData(req, result => {
            console.log(result);
            let query = `INSERT INTO judges_list (code, nama, instansi, telp, email) VALUES ('${result.code}','${result.nama}','${result.instansi}' ,${result.telp}, '${result.email}') `;
            db.run(query, function(err, result) {
              if (err) {
                console.log(err);
                console.log(query);
              } else {
                res.writeHead(302, {
                  Location: "./views/main.html"
                });
                res.end();
              }
            });
            res.end()
            //res.end(`Parsed data belonging to ${result.code}`);
          });
        }
        res.write(data);
      }
      res.end();
    });
  } else if (url_split[1] === "edit" && url_split[2] !== '' && url_split[2] !== 'public') {
    fs.readFile("./views/edit.html", null, function(error, data) {
      if (error) {
        res.writeHead(404);
        res.write("Whoops! File not found!");
        res.end();
      } else {
        var strHtml;
        var buf;
        console.log(url_split[2]);
        db.get("SELECT * FROM judges_list where no="+url_split[2], (err, rows) => {
          strHtml = data.toString();
          strHtml = strHtml.replace('no_val',rows.no);
          strHtml = strHtml.replace('code_val',rows.code);
          strHtml = strHtml.replace('nama_val',rows.nama);
          strHtml = strHtml.replace('instansi_val',rows.instansi);
          strHtml = strHtml.replace('telp_val',rows.telp);
          strHtml = strHtml.replace('email_val',rows.email);
          
          buf = Buffer.from(strHtml, 'utf8');
          // console.log(strHtml)
          res.write(buf);
          res.end();
        });
        // console.log(strHtml); 
      }
      // res.end();
    });
  } else if (url === "edit/process"){
    fs.readFile("./views/edit.html", null, function(error, data) {
      if (error) {
        res.writeHead(404);
        res.write("Whoops! File not found!");
        res.end();
      } else {
        res.write(data);
        if (req.method === 'GET'){
          collectRequestData(req, result => {
            console.log(result);
            let query = `UPDATE judges_list SET code = '${result.code}', nama = '${result.nama}', instansi ='${result.instansi}' , telp = ${result.telp}, email ='${result.email}' WHERE no = ? `;
            db.run(query, url.searchParams.has('no'), 
              function(err,result){
                if (err){
                  console.log(err);
                  console.log(query);
                } else{
                  res.writeHead(302, {
                      Location: "./views/main.html"
                  });
                  res.end();
                }
              }
            )
          });
        }
        // current_url.pathname='/edit';
        // console.log(url.href);

        // var q = ur.parse(url,true);
        // console.log(q);
        
        // var str = pathname;
        // var pattern =/^\/edit\//;
        // var arrMatches = str.match(pattern);
        // if(arrMatches){
        //   console.log(arrMatches+" sesuai");
        // }else{
        //   console.log(arrMatches+" tida sesuai");
        // }
      }
      // res.end();
    });

  } else if (url === "/:no"){
  
    var str = pathname;
    var pattern =/\/edit\//;
    var arrMatches = str.match(pattern);
    if(arrMatches){
      console.log(arrMatches+" sesuai");

    }else{
      console.log(arrMatches+" tida sesuai");
    }

    let query = `SELECT * from judges_list where no = ?`;
    db.get(query, url.searchParams.has('no'), (err,row)=>{

    })
       
  }else {
    res.write("page not found");
    res.end();
  }
});

// const req = https.request(options,(res) => {
//   // ...........
// })

server.listen(PORT, function() {
  console.log("Listening on port http://localhost:" + PORT);
});

function collectRequestData(request, callback) {
  const FORM_URLENCODED = "application/x-www-form-urlencoded";
  if (request.headers["content-type"] === FORM_URLENCODED) {
    let body = "";
    request.on("data", chunk => {
      body += chunk.toString();
    });
    request.on("end", () => {
      callback(parse(body));
    });
  } else {
    callback(null);
  }
}
