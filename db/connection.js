const mysql = require("mysql2");
// const config = require("./config.json");
const util = require("util");

const connection = mysql.createConnection({
    host: "localhost",
    // port: 3001,
    user: "root",
    password: "Elsey213",
    database: "mysara_db"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");
});

connection.query = util.promisify(connection.query);

module.exports = connection;