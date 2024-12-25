// Imports
const express = require("express");
const { addProductPage,
        addProduct,
        getProductPage,
        editProductPage,
        updateProduct,
        deleteProduct 
    } = require("../controllers/product.controller");

// Declarations
const router = express.Router();

// Endpoints
router.get("/add", addProductPage);
router.post("/add", addProduct);
router.get("/get", getProductPage);
router.get("/edit/:id", editProductPage);
router.post("/update/:id", updateProduct);
router.get("/delete/:id", deleteProduct);

// Exports
module.exports = router;