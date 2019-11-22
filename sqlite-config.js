const sqlite3 = require('sqlite3').verbose();

// Verbose : debug mode sqlite3

const dbFile = __dirname + "/db/info.db";

let db = new sqlite3.Database(dbFile, sqlite3.OPEN_READWRITE, (err) => {
    if(err) throw err;
    console.log("Koneksi ke database berhasil!");
});

module.exports = db;