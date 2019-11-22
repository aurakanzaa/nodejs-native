const db = require("../sqlite-config");

db.serialize(() => {
  let sql = `DELETE FROM info`;

  db.run(sql, err => {
    if (!err) console.log("All data deleted");
  });
});

db.close();
