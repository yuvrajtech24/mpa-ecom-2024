// Imports
const express = require("express");
const {
    addCategoryPage,
    addCategory,
    getCategoryPage,
    editCategoryPage,
    updateCategory,
    deleteCategory
} = require("../controllers/category.controller");
const { body, param } = require('express-validator');
const { decode } = require("html-entities")

// Declarations
const router = express.Router();

// Endpoints
router.get("/add", addCategoryPage);

router.post("/add", 
    body("categoryName")
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
    .notEmpty().withMessage("Category name empty")
    .matches(/^[a-zA-Z0-9 ]+$/).withMessage("Category name must only contain letters and numbers")
    .isLength({min: 1, max: 100}).withMessage("Category name should have 1 to 100 characters"), 
    addCategory);

router.get("/get", getCategoryPage);

router.get("/edit/:id", 
    param("id")
    .trim()
    .toLowerCase()
    .isUUID(4).withMessage("Invalid UUID"),
    editCategoryPage);

router.post("/update/:id", 
    body("categoryName")
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
    .notEmpty().withMessage("Category name should not be empty")
    .matches(/^[a-zA-Z0-9 ]+$/).withMessage("Category name must only contain letters and numbers")
    .isLength({min: 1, max: 100}).withMessage("Category name should have 1 to 100 characters"),
    param("id")
    .trim()
    .toLowerCase()
    .isUUID(4).withMessage("Invalid UUID"),
    updateCategory);
    
router.get("/delete/:id", 
    param("id")
    .trim()
    .toLowerCase()
    .isUUID(4).withMessage("Invalid UUID"), 
    deleteCategory);

// Exports
module.exports = router;