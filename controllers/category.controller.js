// Imports
const { CategoryService } = require("../services/category.service");

// Controllers
function addCategoryPage(req, res, next) {
    return res.status(200).render("addCategory");
}
async function addCategory(req, res, next) {
    let { categoryName } = req.body;
    try {
        let result = await CategoryService.createCategory(categoryName);
        return res.status(304).redirect("/category/get");
    } catch (err) {
        return res.status(500).send({name: err.name, message: err.message});
    }
}
async function getCategoryPage(req, res, next) {
    try {
        let categories = await CategoryService.getAllCategory();
        return res.status(200).render("category", {categories});
    } catch(err) {
        return res.status(500).send({name: err.name, message: err.message});
    }
}
async function editCategoryPage(req, res, next) {
    let categoryId = req.params.id;
    try {
        let [category] = await CategoryService.getOneCategory(categoryId);
        return res.status(200).render("editCategory", {category});
    } catch(err) {
        return res.status(500).send({name: err.name, message: err.message});
    }
}
async function updateCategory(req, res, next) {
    let categoryId = req.params.id;
    let { categoryName } = req.body;
    try {
        let result = await CategoryService.updateCategory(categoryId, categoryName);
        return res.status(304).redirect("/category/get");
    } catch(err) {
        return res.status(500).send({name: err.name, message: err.message});
    }
}
async function deleteCategory(req, res, next) {
    let categoryId = req.params.id;
    try {
        let result = await CategoryService.deleteCategory(categoryId);
        return res.status(304).redirect("/category/get");
    } catch(err) {
        return res.status(500).send({name: err.name, message: err.message});
    }
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