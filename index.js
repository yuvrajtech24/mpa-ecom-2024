// Imports
const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
require("dotenv").config();
const { Category } = require("./models/categoryModel");
const { Product } = require("./models/productModel");
const path = require("path");

// Declarations
const app = express();
const dbConnection = mysql.createConnection({
    host: process.env.DBHOST,
    port: process.env.DBPORT,
    database: process.env.DBNAME,
    user: process.env.DBUSERNAME,
    password: process.env.DBPASSWORD
});
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

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
app.get("/", (req, res, next) => {
    res.redirect("/category/get");
})
app.get("/category/add", (req, res, next) => {
    return res.status(200).render("addCategory");
})
app.post("/category/add", (req, res, next) => {
    let { categoryName } = req.body;
    Category.create(categoryName, dbConnection, (err, result) => {
        if(err) return res.status(500).send(err);
        res.status(304).redirect("/category/get");
    });
});
app.get("/category/get", (req, res, next) => {
    Category.get(dbConnection, (err, categories) => {
        if(err) return res.status(500).send(err);
        return res.status(200).render("category", {categories});
    })
});
app.get("/category/edit/:id", (req, res, next) => {
    let categoryId = req.params.id;
    Category.findOne(categoryId, dbConnection, (err, categoryArr) => {
        let [category] = categoryArr;  
        if(err) return res.status(500).send(err);
        return res.status(200).render("editCategory", {category});
    }) 
});
app.post("/category/update/:id", (req, res, next) => {
    let categoryId = req.params.id;
    let { categoryName } = req.body;

    Category.update(categoryId, categoryName, dbConnection, (err, result) => {
        if(err) return res.status(500).send(err);
        return res.status(304).redirect("/category/get");
    })
});
app.get("/category/delete/:id", (req, res, next) => {
    let categoryId = req.params.id;
    
    Category.delete(categoryId, dbConnection, (err, result) => {
        if(err) return res.status(500).send(err);
        res.status(304).redirect("/category/get");
    })
});

app.get("/product/add", (req, res, next) => {
    Category.get(dbConnection, (err, categories) => {
        if(err) return res.status(500).send(err);
        return res.status(200).render("addProduct", {categories});
    })
})
app.post("/product/add", (req, res, next) => {
    let { productName, categoryId } = req.body;
    console.log("product add form data = ", req.body);
    Product.create(productName, categoryId, dbConnection, (err, result) => {
        if(err) {
            return res.status(500).send(err);
        }

        return res.status(304).redirect("/product/get");
    })
});
app.get("/product/get", (req, res, next) => {
    let page = parseInt(req.query.page) || 1;
    let pageSize = parseInt(req.query.pageSize) || 5;
    let offset = (page - 1) * pageSize;
    console.log("page NUmber = ", page);
    console.log("page size = ", pageSize);
    console.log("offset = ", offset);
    Product.get(offset, pageSize, dbConnection, (err, products) => {
        if(err) return res.status(500).send(err);
        return res.status(200).render("product", {products, page, pageSize})
    });
});
app.get("/product/edit/:id", (req, res, next) => {
    let productId = req.params.id;

    Product.findOne(productId, dbConnection, (err, productArr) => {
        if(err) {
            return res.status(500).send(err);
        } else {
            let [ product ] = productArr;
            Category.get(dbConnection, (err, categories) => {
                if(err) return res.status(500).send(err);
                return res.status(200).render("editProduct", {product, categories});
            });
        }
        
    })
})
app.post("/product/update/:id", (req, res, next) => {
    let { productName, categoryId } = req.body;
    let productId = req.params.id;

    console.log(req.body);
    console.log(productId);

    Product.update(
        productId, 
        productName,
        categoryId, 
        dbConnection, 
        (err, result) => {
        if(err) { 
            return res.status(500).send(err);
        } else {
            return res.status(304).redirect("/product/get");
        }
    });
});
app.get("/product/delete/:id", (req, res, next) => {
    let productId = req.params.id;

    Product.delete(productId, dbConnection, (err, result) => {
        if(err) return res.status(500).send(err);
        return res.status(304).redirect("/product/get");
    });
});

