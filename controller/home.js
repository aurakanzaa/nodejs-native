const fs = require('fs');
const qstring = require('querystring');
// const _ = require('underscore');
const music = require('../model/music');
const removeReg = /^\/remove\/(\d{1,6})$/;
const editReg = /^\/edit\/(\d{1,6})$/;

class Home {
  // rendering funct
  render(res) {
    res.writeHead(200,{
      'Content-Type':'text/html'
    });
    // readfile
    fs.readFile(__dirname + '/../views/main.html', 'utf8', function (err, data) {
      if (err) {
        return res.end(err.message);
      }
      // // combine the template engine to render data
      // let compiled = _.template(data);
      // let musicList = music.getAllMusic(); // get all the data through model
      // let htmlStr = compiled({
      //   musicList
      // });
      // Pass the full html string response to the client
      res.writeHead(200, {
        'Content-Type': 'text/html'
      });
      // return to the front desk
      // res.end(htmlStr);
      res.end();
    });
  }
  // removal function
  remove(res, pathname) {
    let id = pathname.match(removeReg)[1] - 0;
    let flag = music.removeMusicById(id);
    if(flag) {
      // successfully deleted
      res.end(JSON.stringify({
        code: '1',
        msg: 'ok'
      }));
    } else {
      // failed deleted
      res.end(JSON.stringify({
        code: '0',
        msg: 'not found'
      }));
    }
  }
  // jump to edit page funct
  edit(res, pathname, params) {
    let id = pathname.match(editReg)[1] - 0;
    let musicList = music.getAllMusic(); // get all the data through model
    var musicInfo = music.getMusicById(id);
    if(!musicInfo) {
      return res.end('music is not exists');
    }
    fs.readFile(__dirname + '/../views/edit.html', 'utf8', function (err, data) {
      if (err) {
        return res.end(err.message);
      }
      // after getting the data, the template is compiled
      let compiled = _.template(data);
      let htmlStr = compiled({
        musicInfo
      });
      res.writeHead(200, {
        'Content-Type': 'text/html; charset=utf-8'
      });
      res.end(htmlStr);
    });
  }
  // jump to add page function
  add (res, pathname, params) {
    res.writeHead(200,{
      'Content-Type':'text/html'
    });
    fs.createReadStream(__dirname + '/../views/insert.html', 'utf8').pipe(res);
  }
 
}

module.exports = new Home();