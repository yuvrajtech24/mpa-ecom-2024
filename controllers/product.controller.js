// Imports
const { ProductService } = require("../services/product.service");
const { CategoryService } = require("../services/category.service");

// Controllers
async function addProductPage(req, res, next) {
    // Category.get(dbConnection, (err, categories) => {
    //     if(err) return res.status(500).send(err);
    //     return res.status(200).render("addProduct", {categories});
    // });
    try {
        let categories = await CategoryService.getAllCategory();
        return res.status(200).render("addProduct", { categories }); 
    } catch(err) {
        return res.status(500).send(err);
    }
}
async function addProduct(req, res, next) {
    let { productName, categoryId } = req.body;
    // Product.create(productName, categoryId, dbConnection, (err, result) => {
    //     if(err) {
    //         return res.status(500).send(err);
    //     }

    //     return res.status(304).redirect("/product/get");
    // })
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
    // let offset = (page - 1) * pageSize;
    // Product.get(offset, pageSize, dbConnection, (err, products) => {
    //     if(err) return res.status(500).send(err);
    //     return res.status(200).render("product", {products, page, pageSize})
    // });
    try {
        let products = await ProductService.getAllProduct(page, pageSize);
        return res.status(200).render("product", { products, page, pageSize });
    } catch(err) {
        return res.status(500).send(err);
    }
}
async function editProductPage(req, res, next) {
    let productId = req.params.id;

    // Product.findOne(productId, dbConnection, (err, productArr) => {
    //     if(err) {
    //         return res.status(500).send(err);
    //     } else {
    //         let [ product ] = productArr;
    //         Category.get(dbConnection, (err, categories) => {
    //             if(err) return res.status(500).send(err);
    //             return res.status(200).render("editProduct", {product, categories});
    //         });
    //     }
        
    // })
    try {
        let [ product ] = await ProductService.getOneProduct(productId);
        let categories = await CategoryService.getAllCategory();
        return res.status(200).render("editProduct", { product, categories });
    } catch(err) {
        return res.status(500).send(err);
    }
}
async function updateProduct(req, res, next) {
    let { productName, categoryId } = req.body;
    let productId = req.params.id;

    // Product.update(
    //     productId, 
    //     productName,
    //     categoryId, 
    //     dbConnection, 
    //     (err, result) => {
    //     if(err) { 
    //         return res.status(500).send(err);
    //     } else {
    //         return res.status(304).redirect("/product/get");
    //     }
    // });
    try {
        let result = await ProductService.updateProduct(productId, productName, categoryId);
        return res.status(304).redirect("/product/get");
    } catch(err) {
        return res.status(500).send(err);
    }
}
async function deleteProduct(req, res, next) {
    let productId = req.params.id;

    // Product.delete(productId, dbConnection, (err, result) => {
    //     if(err) return res.status(500).send(err);
    //     return res.status(304).redirect("/product/get");
    // });
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