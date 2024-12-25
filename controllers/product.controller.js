// Imports
const dbConnection = require("../config/db.config");
const { Product } = require("../models/product.model");
const { Category } = require("../models/category.model");

// Controllers
function addProductPage(req, res, next) {
    Category.get(dbConnection, (err, categories) => {
        if(err) return res.status(500).send(err);
        return res.status(200).render("addProduct", {categories});
    })
}
function addProduct(req, res, next) {
    let { productName, categoryId } = req.body;
    console.log("product add form data = ", req.body);
    Product.create(productName, categoryId, dbConnection, (err, result) => {
        if(err) {
            return res.status(500).send(err);
        }

        return res.status(304).redirect("/product/get");
    })
}
function getProductPage(req, res, next) {
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
}
function editProductPage(req, res, next) {
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
}
function updateProduct(req, res, next) {
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
}
function deleteProduct(req, res, next) {
    let productId = req.params.id;

    Product.delete(productId, dbConnection, (err, result) => {
        if(err) return res.status(500).send(err);
        return res.status(304).redirect("/product/get");
    });
}

// Exports
module.exports = {
    addProductPage,
    addProduct,
    getProductPage,
    editProductPage,
    updateProduct,
    deleteProduct
}