// Imports
const express = require("express");
const dbConnection = require("../config/dbConfig");
const { Category } = require("../models/categoryModel");
const { Product } = require("../models/productModel");

// Declarations
const router = express.Router();

// Endpoints
router.get("/add", (req, res, next) => {
    Category.get(dbConnection, (err, categories) => {
        if(err) return res.status(500).send(err);
        return res.status(200).render("addProduct", {categories});
    })
})
router.post("/add", (req, res, next) => {
    let { productName, categoryId } = req.body;
    console.log("product add form data = ", req.body);
    Product.create(productName, categoryId, dbConnection, (err, result) => {
        if(err) {
            return res.status(500).send(err);
        }

        return res.status(304).redirect("/product/get");
    })
});
router.get("/get", (req, res, next) => {
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
router.get("/edit/:id", (req, res, next) => {
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
router.post("/update/:id", (req, res, next) => {
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
router.get("/delete/:id", (req, res, next) => {
    let productId = req.params.id;

    Product.delete(productId, dbConnection, (err, result) => {
        if(err) return res.status(500).send(err);
        return res.status(304).redirect("/product/get");
    });
});

// Exports
module.exports = router;