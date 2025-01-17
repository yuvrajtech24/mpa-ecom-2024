// Imports
const express = require("express");
const { 
    addProductPage,
    addProduct,
    getProductPage,
    editProductPage,
    updateProduct,
    deleteProduct 
} = require("../controllers/product.controller");
const {
    editProductValidators,
    addProductValidators,
    updateProductValidators,
    deleteProductValidators
} = require("../middlewares/product.middleware");

// Declarations
// const router = express.Router();

// Routes - Rendered Page
// router.get("/add", addProductPage);
// router.get("/edit/:id", editProductValidators,editProductPage);

// Routes - CRUD
// router.get("/get", getProductPage);
// router.post("/add", addProductValidators, addProduct);
// router.post("/update/:id", updateProductValidators, updateProduct);
// router.get("/delete/:id", deleteProductValidators, deleteProduct);

// Exports
// module.exports = router;