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
const { 
    editCategoryValidators,
    addCategoryValidators,
    updateCategoryValidators,
    deleteCategoryValidators
} = require("../middlewares/category.middleware");

// Declarations
// const router = express.Router();

// Route - Rendered Pages
// router.get("/add", addCategoryPage);
// router.get("/edit/:id", editCategoryValidators, editCategoryPage);

// Route - CRUD 
// router.get("/get", getCategoryPage);
// router.post("/add", addCategoryValidators, addCategory);
// router.post("/update/:id", updateCategoryValidators, updateCategory);
// router.get("/delete/:id", deleteCategoryValidators, deleteCategory);

// Exports
// module.exports = router;