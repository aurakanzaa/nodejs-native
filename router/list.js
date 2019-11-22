const homeCtrl = require('../controller/home');
const editCtrl = require('../controller/edit');
const addCtrl = require('../controller/add');

// Define a route list
class List {
  // home
  '/' (res) {
    homeCtrl.render(res);
  }
  // Home deletion function processing
  '/remove' (res, pathname) {
    homeCtrl.remove(res, pathname);
  }
  // Edit processing such as: /edit/1
  '/edit' (res, pathname, params, method) {
    if(method === 'GET') {
      homeCtrl.edit(res, pathname, params);
    }else if(method === 'POST') {
      editCtrl.edit(res, pathname, params);
    }
    // other possible methods
  }
  // add processing
  '/add' (res, pathname, params, method) {
    if(method === 'GET') {
      homeCtrl.add(res, pathname, params);
    } else if (method === 'POST') {
      addCtrl.add(res, pathname, params);
    }
    // other possible methods
  }
  
}

// Get all its own routing list
const routerAttrList = Object.getOwnPropertyNames(List.prototype); 

// Judgment of routing
function isRouter(pathname) {
  return routerAttrList.find((item, index)=>{
    // If it matches, return the currently defined route
    if(pathname === item || pathname.startsWith(item) && (item !== '/')) {
      return item;
    }
  });
}

module.exports = {
  isRouter,
  routerAttrList,
  list: new List()
};