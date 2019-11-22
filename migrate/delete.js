const db = require("../sqlite-config");

db.serialize(() => {
  let sql = `DELETE FROM info WHERE id=?`;
  let id = "1";

  db.run(sql, [id], err => {
    if (!err) console.log("Data deleted");
  });
});

db.close();
