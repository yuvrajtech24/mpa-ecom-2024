// Imports
const { ProductService } = require("../services/product.service");
const { CategoryService } = require("../services/category.service");
const { validationResult } = require('express-validator');

// Controllers
async function addProductPage(req, res, next) {
    try {
        let categories = await CategoryService.getAllCategory();
        return res.status(200).render("addProduct", { categories, errors: null }); 
    } catch(err) {
        return res.status(500).send(err);
    }
}

async function addProduct(req, res, next) {
    let { productName, categoryId } = req.body;
    let validResult = validationResult(req);
    let categories = await CategoryService.getAllCategory();
    if(!validResult.isEmpty()) {
        return res
        .status(400)
        .render("addProduct", {
            categories,
            errors: validResult.array()
        });
    }
    try {
        let result = await ProductService.createProduct(productName, categoryId);
        return res.status(304).redirect("/product/get");
    } catch(err) {
        return res.status(500).send(err);
    }
}

async function getProductPage(req, res, next) {
    let page = parseInt(req.query.page) || 1;
    let pageSize = parseInt(req.query.pageSize) || 5;
    try {
        let products = await ProductService.getAllProduct(page, pageSize);
        return res.status(200).render("product", { products, page, pageSize, errors: null });
    } catch(err) {
        return res.status(500).send(err);
    }
}

async function editProductPage(req, res, next) {
    let productId = req.params.id;
    let validResult = validationResult(req);
    let page = 1;
    let pageSize = 5;
    if(!validResult.isEmpty()) {
        let products = await ProductService.getAllProduct(page, pageSize);
        return res
        .status(400)
        .render("product", { 
            products, 
            page, 
            pageSize, 
            errors: validResult.array() 
        });
    }
    try {
        let [ product ] = await ProductService.getOneProduct(productId);
        let categories = await CategoryService.getAllCategory();
        return res.status(200).render("editProduct", { product, categories, errors: null });
    } catch(err) {
        return res.status(500).send(err);
    }
}

async function updateProduct(req, res, next) {
    let productId = req.params.id;
    let { productName, categoryId } = req.body;
    let categories = await CategoryService.getAllCategory();
    let validResult = validationResult(req);
    if(!validResult.isEmpty()) {
        return res
        .status(400)
        .render("editProduct", {
            product: {productId, productName},
            categories,
            errors: validResult.array()
        });
    }
    try {
        let result = await ProductService.updateProduct(productId, productName, categoryId);
        return res.status(304).redirect("/product/get");
    } catch(err) {
        return res.status(500).send(err);
    }
}

async function deleteProduct(req, res, next) {
    let productId = req.params.id;
    let page = parseInt(req.query.page) || 1;
    let pageSize = parseInt(req.query.pageSize) || 5;
    let validResult = validationResult(req);
    if(!validResult.isEmpty()) {
        let products = await ProductService.getAllProduct(page, pageSize);
        return res
        .status(400)
        .render("product", 
            {
                products,
                page,
                pageSize,
                errors: validResult.array()
            });
    }
    try {
        let result = await ProductService.deleteProduct(productId);
        return res.status(304).redirect("/product/get");
    } catch(err) {
        return res.status(500).send(err);
    }
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