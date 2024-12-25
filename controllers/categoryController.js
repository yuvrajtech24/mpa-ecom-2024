// Imports
const dbConnection = require("../config/dbConfig");
const { Category } = require("../models/categoryModel");

// Controllers
function addCategoryPage(req, res, next) {
    return res.status(200).render("addCategory");
}
function addCategory(req, res, next) {
    let { categoryName } = req.body;
    Category.create(categoryName, dbConnection, (err, result) => {
        if(err) return res.status(500).send(err);
        res.status(304).redirect("/category/get");
    });
}
function getCategoryPage(req, res, next) {
    Category.get(dbConnection, (err, categories) => {
        if(err) return res.status(500).send(err);
        return res.status(200).render("category", {categories});
    })
}
function editCategoryPage(req, res, next) {
    let categoryId = req.params.id;
    Category.findOne(categoryId, dbConnection, (err, categoryArr) => {
        let [category] = categoryArr;  
        if(err) return res.status(500).send(err);
        return res.status(200).render("editCategory", {category});
    }) 
}
function updateCategory(req, res, next) {
    let categoryId = req.params.id;
    let { categoryName } = req.body;

    Category.update(categoryId, categoryName, dbConnection, (err, result) => {
        if(err) return res.status(500).send(err);
        return res.status(304).redirect("/category/get");
    })
}
function deleteCategory(req, res, next) {
    let categoryId = req.params.id;
    
    Category.delete(categoryId, dbConnection, (err, result) => {
        if(err) return res.status(500).send(err);
        res.status(304).redirect("/category/get");
    })
}

// Exports
module.exports = {
    addCategoryPage,
    addCategory,
    getCategoryPage,
    editCategoryPage,
    updateCategory,
    deleteCategory
}