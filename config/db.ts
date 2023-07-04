const mysql = require("mysql");

const db = mysql.createPool({
  host: "127.0.0.1",
  port: "3306",
  user: "root",
  password: "tarik",
  database: "challenge",
  connectionLimit: 10,
});

db.getConnection(function (error) {
  if (error) {
    throw error;
  }
  console.log("Databse is now ok");
});

module.exports = db;
