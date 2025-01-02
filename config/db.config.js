// Imports
const mysql = require("mysql2/promise");

// Config
let dbConnectionPromise = null;

async function createDbConnection() {
    if (!dbConnectionPromise) {
        dbConnectionPromise = mysql.createConnection({
            host: process.env.DBHOST,
            port: process.env.DBPORT,
            database: process.env.DBNAME,
            user: process.env.DBUSERNAME,
            password: process.env.DBPASSWORD,
        });

        try {
            await dbConnectionPromise;
            console.log("Database connected");
        } catch (err) {
            console.error("Database connection failed", err);
            process.exit(1); // Exit the process if DB connection fails
        }
    }
    return dbConnectionPromise;
}

// Exports
module.exports = { createDbConnection };