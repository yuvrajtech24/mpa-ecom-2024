// Import
const { v4:uuid4 } = require("uuid");
const { Product } = require("../models/product.model");

// Service
class ProductService {
    static async createProduct(productName, categoryId) {
        let productId = uuid4(); 
        try {
            let result = await Product.create(productId, productName, categoryId);
            console.log("query result = ", result);
            return result;
        } catch(err) {
            console.log("error name = ", err.name);
            console.log("error message = ", err.message);
            console.log("error stack = ", err.stack);
            throw err;
        }
    }
    static async getOneProduct(productId) {
        try {
            let result = await Product.getOne(productId);
            console.log("query result = ", result);
            return result;
        } catch(err) {
            console.log("error name = ", err.name);
            console.log("error message = ", err.message);
            throw err;
        }
    }
    static async getAllProduct(pageNumber, pageSize) {
        let offset = (pageNumber - 1) * pageSize;
        try {
            let result = await Product.getAll(offset, pageSize);
            console.log("query result = ", result);
            return result;
        } catch(err) {
            console.log("error name = ", err.name);
            console.log("error message = ", err.message);
            console.log("error stack = ", err.stack);
            throw err;
        }
    }
    static async updateProduct(productId, productName, categoryId) {
        try {
            let result = await Product.update(productId, productName, categoryId);
            console.log("query result = ", result);
            return result;
        } catch(err) {
            console.log("error name = ", err.name);
            console.log("error message = ", err.message);
            throw err;
        }
    }
    static async deleteProduct(productId) {
        try {
            let result = await Product.delete(productId);
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
module.exports = { ProductService }
