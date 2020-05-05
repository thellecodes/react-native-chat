const mysql = require("mysql");
var db;

connectDatabase = () => {
  if (!db) {
    db = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "",
      database: "chatsystem"
    });

    db.connect(function(err) {
      if (!err) {
        console.log("Database is connected!");
      } else {
        console.log("Error connecting database!");
        throw err;
      }
    });
  }
  return db;
};

module.exports = connectDatabase();
