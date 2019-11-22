const fs = require('fs');
const url = require('url');
const routerList = require('./list');
const staticServer = require('../server/static'); // static file server

const router = function (req, res, params) {
  let pathname = url.parse(req.url).pathname;
  
  if(pathname.startsWith('/public/')) {
    return staticServer(res, pathname);
  }
  // Get the existence of a defined route
  let routerItem = routerList.isRouter(pathname);
  // f the route is defined, then a callback function that defines the route is executed.
  if(routerItem) {
    return routerList.list[routerItem](res, pathname, params, req.method); 
  }
  // No route defined, then return 404 page
  res.writeHead(404, { 'Content-Type': 'text/html' });
  fs.createReadStream(__dirname + '/../views/404.html', 'utf8').pipe(res);
};

module.exports = router;