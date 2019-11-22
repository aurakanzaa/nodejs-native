const db = require("../sqlite-config");

db.serialize(() => {
  let sql =
    "INSERT INTO info (name, job, age, email) VALUES ( 'Ahmad Albar', 'Guru', '19', 'test@gmail.com')";
  db.run(sql, err => {
    if (err) throw err;
    console.log("1 record inserted");
  });
});

db.close();
