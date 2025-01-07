// Imports
const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();
const path = require("path");
const categoryRoute = require("./routes/category.route");
const productRoute = require("./routes/product.route");

// Declarations
const app = express();
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Server Config
(() => {
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
            process.exit(1);
        }
    })();

// Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

// Endpoints
app.get("/", (req, res, next) => {
    res.redirect("/category/get");
})
app.use("/category", categoryRoute);
app.use("/product", productRoute);


