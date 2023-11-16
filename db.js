/** Database connection for messagely. */


const { Client } = require("pg");
const { DB_URI } = require("./config");

let db;
if (process.env.NODE_ENV === "test"){
    db = new Client({
        host: "/var/run/postgresql",
        database: "messagely_test"
      });
} else {
    db = new Client({
        host: "/var/run/postgresql",
        database: "messagely"
      });
};

db.connect()
  .then(() => {
    console.log('Connected to the database');
  })
  .catch(error => {
    console.error('Error connecting to the database:', error);
  });

module.exports = db;