// Imports
const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();
const path = require("path");
const cors = require("cors");
const { 
    addProductPage,
    addProduct,
    getProductPage,
    editProductPage,
    updateProduct,
    deleteProduct 
} = require("./controllers/product.controller");
const {
    editProductValidators,
    addProductValidators,
    updateProductValidators,
    deleteProductValidators
} = require("./middlewares/product.middleware");
const {
    addCategoryPage,
    addCategory,
    getCategoryPage,
    editCategoryPage,
    updateCategory,
    deleteCategory
} = require("./controllers/category.controller");
const { 
    editCategoryValidators,
    addCategoryValidators,
    updateCategoryValidators,
    deleteCategoryValidators
} = require("./middlewares/category.middleware");

// Declarations
const app = express();
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Server Config
(() => {
        try{
            app.listen(
                process.env.APPPORT, 
                process.env.APPHOST, 
                () => {
                console.log("app server connected, port = ", process.env.APPPORT);
            });
        } catch(err) {
            console.log("App server startup failed", {
                name: err.name,
                message: err.message,
            });
            process.exit(1);
        }
    })();

// Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // Allow all origins
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, PATCH"); // Allow specific methods (include PUT here)
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization" // Include Authorization header if needed
        );
    next();
});
app.use((req, res, next) => {
    console.log("request url = ", req.url);
    console.log("request host = ", req.host);
    console.log("request path = ", req.path);
    console.log("request path parameter = ", req.params);
    console.log("request query parameter = ", req.query);
    console.log("request method = ", req.method);
    console.log("request body = ", req.body);
    next();
})

// Endpoints
app.get("/", (req, res, next) => {
    res.redirect("/category");
})
// app.use("/category", categoryRoute);
// app.use("/product", productRoute);


// Route - Rendered Pages
// <---- Category ---->
app.get("/category/add", addCategoryPage);
app.get("/category/edit/:id", editCategoryValidators(), editCategoryPage);
// <---- Product ---->
app.get("/product/add", addProductPage);
app.get("/product/edit/:id", editProductValidators(), editProductPage);

// Route - CRUD 
// <---- Category ---->
app.get("/category", getCategoryPage);
app.post("/category", addCategoryValidators(), addCategory);
app.put("/category/:id", updateCategoryValidators(), updateCategory);
app.delete("/category/:id", deleteCategoryValidators(), deleteCategory);
// <---- Product ---->
app.get("/product", getProductPage);
app.post("/product", addProductValidators(), addProduct);
app.put("/product/:id", updateProductValidators(), updateProduct);
app.delete("/product/:id", deleteProductValidators(), deleteProduct);