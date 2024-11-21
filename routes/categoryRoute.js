// Imports
const express = require("express");
const dbConnection = require("../config/dbConfig");
const { Category } = require("../models/categoryModel");

// Declarations
const router = express.Router();

// Endpoints
router.get("/add", (req, res, next) => {
    return res.status(200).render("addCategory");
})
router.post("/add", (req, res, next) => {
    let { categoryName } = req.body;
    Category.create(categoryName, dbConnection, (err, result) => {
        if(err) return res.status(500).send(err);
        res.status(304).redirect("/category/get");
    });
});
router.get("/get", (req, res, next) => {
    Category.get(dbConnection, (err, categories) => {
        if(err) return res.status(500).send(err);
        return res.status(200).render("category", {categories});
    })
});
router.get("/edit/:id", (req, res, next) => {
    let categoryId = req.params.id;
    Category.findOne(categoryId, dbConnection, (err, categoryArr) => {
        let [category] = categoryArr;  
        if(err) return res.status(500).send(err);
        return res.status(200).render("editCategory", {category});
    }) 
});
router.post("/update/:id", (req, res, next) => {
    let categoryId = req.params.id;
    let { categoryName } = req.body;

    Category.update(categoryId, categoryName, dbConnection, (err, result) => {
        if(err) return res.status(500).send(err);
        return res.status(304).redirect("/category/get");
    })
});
router.get("/delete/:id", (req, res, next) => {
    let categoryId = req.params.id;
    
    Category.delete(categoryId, dbConnection, (err, result) => {
        if(err) return res.status(500).send(err);
        res.status(304).redirect("/category/get");
    })
});

// Exports
module.exports = router;