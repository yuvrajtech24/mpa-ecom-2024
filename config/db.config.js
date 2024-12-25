// Imports
const mysql = require("mysql2");

// Config
const dbConnection = mysql.createConnection({
    host: process.env.DBHOST,
    port: process.env.DBPORT,
    database: process.env.DBNAME,
    user: process.env.DBUSERNAME,
    password: process.env.DBPASSWORD
});

// Exports
module.exports = dbConnection;