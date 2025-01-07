// Imports
const express = require("express");
const { addProductPage,
        addProduct,
        getProductPage,
        editProductPage,
        updateProduct,
        deleteProduct 
    } = require("../controllers/product.controller");
const { body, param, query } = require('express-validator');
const { decode } = require("html-entities")

// Declarations
const router = express.Router();

// Endpoints
router.get("/add", addProductPage);

router.post("/add", 
    body("productName")
    .trim()
    .escape()
    .stripLow()
    .customSanitizer(input => {
        input = decode(input);
        // remove html tags
        input = input.replace(/<\/?[^>]+(>|$)/g, "");
        // remove special characters
        input = input.replace(/[^a-zA-Z0-9 ]/g, '').replace(/\s+/g, ' ');
        return input;})
    .notEmpty().withMessage("Product name empty")
    .matches(/^[a-zA-Z0-9 ]+$/).withMessage("Product name must only contain letters and numbers")
    .isLength({min: 1, max: 100}).withMessage("Product name should have 1 to 100 characters"),
    body("categoryId")
    .trim()
    .toLowerCase()
    .isUUID(4).withMessage("Invalid category UUID"),
    addProduct);

router.get("/get", getProductPage);

router.get("/edit/:id", 
    param("id")
    .trim()
    .toLowerCase()
    .isUUID(4).withMessage("Invalid UUID"),
    editProductPage);

router.post("/update/:id", 
    body("productName")
    .trim()
    .escape()
    .stripLow()
    .customSanitizer(input => {
    input = decode(input);
    // remove html tags
    input = input.replace(/<\/?[^>]+(>|$)/g, "");
    // remove special characters
    input = input.replace(/[^a-zA-Z0-9 ]/g, '').replace(/\s+/g, ' ');
    return input;})
    .notEmpty().withMessage("Product name should not be empty")
    .matches(/^[a-zA-Z0-9 ]+$/).withMessage("Product name must only contain letters and numbers")
    .isLength({min: 1, max: 100}).withMessage("Product name should have 1 to 100 characters"),
    body("categoryId")
    .trim()
    .toLowerCase()
    .isUUID(4).withMessage("Invalid category UUID"),
    param("id")
    .trim()
    .toLowerCase()
    .isUUID(4).withMessage("Invalid product UUID"),
    updateProduct);

router.get("/delete/:id", 
    param("id")
    .trim()
    .toLowerCase()
    .isUUID(4).withMessage("Invalid UUID"), 
    deleteProduct);

// Exports
module.exports = router;