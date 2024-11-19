// Imports
const express = require("express");
require("dotenv").config();
const mysql = require("mysql2");

// Declarations
const app = express();
const dbConnection = mysql.createConnection({
    host: process.env.DBHOST,
    port: process.env.DBPORT,
    database: process.env.DBNAME,
    user: process.env.DBUSERNAME,
    password: process.env.DBPASSWORD
});

// Server Config
(() => {
    dbConnection.connect((err) => {
        if(err) return console.log("database not connected", {
            name: err.name,
            code: err.message,
        });

        console.log("database server connected");

        try{
            app.listen(process.env.APPPORT, process.env.APPHOST, () => {
                console.log("app server connected");
            });
        } catch(err) {
            console.log("error name = ", err.name);
            console.log("error message = ", err.message);
        }
    })
})();

// Endpoints
app.post("/category/add", (req, res, next) => {});
app.get("/category/get", (req, res, next) => {});
app.patch("/category/update", (req, res, next) => {});
app.delete("/category/delete", (req, res, next) => {});

app.post("/product/add", (req, res, next) => {});
app.get("/product/get", (req, res, next) => {});
app.patch("/product/update", (req, res, next) => {});
app.delete("/product/delete", (req, res, next) => {});

// Exports
module.exports = { dbConnection }; 