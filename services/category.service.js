// Imports
const { v4:uuid4 } = require("uuid");
const { Category } = require("../models/category.model");

// Service
class CategoryService {
    static async getOneCategory(categoryId) {
        try {
            let result = await Category.getOne(categoryId);
            console.log("query result = ", result);
            return result;
        } catch(err) {
            console.log("error name = ", err.name);
            console.log("error message = ", err.message);
            throw err;
        }
    }
    static async getAllCategory() {
        try {
            let result = await Category.getAll();
            console.log("query result = ", result);
            return result;
        } catch(err) {
            console.log("error name = ", err.name);
            console.log("error message = ", err.message);
            console.log("error stack = ", err.stack);
            throw err;
        }
    }
    static async createCategory (categoryName) {
        console.log("create category service");
        let categoryId = uuid4();
        try {
            let result = await Category.create(categoryId, categoryName);
            console.log("query result = ", result);
            return result;
        } catch(err) {
            console.log("error name = ", err.name);
            console.log("error message = ", err.message);
            console.log("error stack = ", err.stack);
            throw err;
        }
    }
    static async updateCategory(categoryId, categoryName) {
        try {
            let result = await Category.update(categoryId, categoryName);
            console.log("query result = ", result);
            return result;
        } catch(err) {
            console.log("error name = ", err.name);
            console.log("error message = ", err.message);
            throw err;
        }
    }
    static async deleteCategory(categoryId) {
        try {
            let result = await Category.delete(categoryId);
            console.log("query result = ", result);
            return result;
        } catch(err) {
            console.log("error name = ", err.name);
            console.log("error message = ", err.message);
            throw err;
        }
    }
}

// Exports
module.exports = { CategoryService }