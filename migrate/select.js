const db = require("../sqlite-config");

db.serialize(() => {
  let sql = "SELECT * FROM info";
  db.all(sql, (err, rows) => {
    if (err) throw err;
    if (rows) {
      // cetak isi rows
      rows.forEach(informasi => {
        console.log(`[${informasi.id}] - ${informasi.name} - ${informasi.job} - ${informasi.age} - ${informasi.email} `);
      });
    } else {
      console.log("tidak ada data/hasil");
    }
  });
});

db.close();
