const db = require('../sqlite-config');

class Add {
  add(res, pathname, params) {
    let { code, nama, instansi, telp, email } = params.body
    let query = `INSERT INTO info (name, job, age, email) VALUES ('${name}','${job}' ,${age}, '${email}') `
    db.run(
        query,
        function(err,result){
            if(err){
                console.log(err)
                console.log(query)
            }else {
                console.log('It Works')
                res.redirect('/main')
            }
        }
    )
  }
}

module.exports = new Add();
