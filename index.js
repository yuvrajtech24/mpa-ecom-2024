// Imports
const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
require("dotenv").config();
const { Category } = require("./models/categoryModel");
const { Product } = require("./models/productModel");

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
        if(err) {
            console.log("Database connection failed", {
                name: err.name,
                code: err.code,
                stack: err.stack
            });
            process.exit(1);
        } else{
            console.log("Database connection success");
        }

        try{
            app.listen(
                process.env.APPPORT, 
                process.env.APPHOST, 
                () => {
                console.log("app server connected");
            });
        } catch(err) {
            console.log("App server startup failed", {
                name: err.name,
                message: err.message,
            });
        }
    })
})();

// Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

// Endpoints
app.post("/category/add", (req, res, next) => {
    let { categoryName } = req.body;
    Category.create(categoryName, dbConnection, (err, result) => {
        if(err) return res.status(500).send(err);
        res.status(200).send(result);
    });
});
app.get("/category/get", (req, res, next) => {
    Category.get(dbConnection, (err, result) => {
        if(err) return res.status(500).send(err);
        res.status(200).send(result);
    })
});
app.patch("/category/update", (req, res, next) => {

});
app.delete("/category/delete/:id", (req, res, next) => {
    let categoryId = req.params.id;

    Category.delete(categoryId, dbConnection, (err, result) => {
        if(err) return res.status(500).send(err);
        res.status(200).send(result);
    })
});

app.post("/product/add", (req, res, next) => {
    let { productName } = req.body;
    Product.create(productName, dbConnection, (err, result) => {
        if(err) {
            return res.status(500).send(err);
        }

        return res.status(200).send(result);
    })
});
app.get("/product/get", (req, res, next) => {
    Product.get(dbConnection, (err, result) => {
        if(err) return res.status(500).send(err);
        return res.status(200).send(result);
    });
});
app.post("/product/update/:id", (req, res, next) => {
    let { productName } = req.body;
    let productId = req.params.id;

    Product.update(
        productId, 
        productName, 
        dbConnection, 
        (err, result) => {
        if(err) { 
            return res.status(500).send(err);
        } else {
            return res.status(200).send(result);
        }
    });
});
app.delete("/product/delete", (req, res, next) => {});