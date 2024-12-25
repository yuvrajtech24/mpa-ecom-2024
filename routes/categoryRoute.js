// Imports
const express = require("express");
const {
    addCategoryPage,
    addCategory,
    getCategoryPage,
    editCategoryPage,
    updateCategory,
    deleteCategory
} = require("../controllers/categoryController");

// Declarations
const router = express.Router();

// Endpoints
router.get("/add", addCategoryPage);
router.post("/add", addCategory);
router.get("/get", getCategoryPage);
router.get("/edit/:id", editCategoryPage);
router.post("/update/:id", updateCategory);
router.get("/delete/:id", deleteCategory);

// Exports
module.exports = router;