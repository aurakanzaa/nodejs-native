const db = require("../sqlite-config");

db.serialize(function() {
  let sql = `CREATE TABLE IF NOT EXISTS info(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name VARCHAR(64),
        job VARCHAR(64),
        age INTEGER(64),
        email VARCHAR(64)
    )`;
  db.run(sql, err => {
    if (err) throw err;
    console.log("Table created");
  });
});

db.close();
