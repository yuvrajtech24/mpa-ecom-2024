// Imports
const { createDbConnection } = require("../config/db.config");

// Models
class Product {
    constructor(productId, productName) {
        this.productId = productId;
        this.productName = productName;
    }
    static async create(productId, productName, categoryId) {
        let connection = null;
        let query = `
        INSERT INTO products
        (productId, productName, categoryId)
        VALUES (?, ?, ?)
        `;
        try {
            connection = await createDbConnection();
            let [rows, fields] = await connection.execute(query,[productId, productName, categoryId]);
            return rows;
        } catch(err) {
            throw err;
        }
    }
    static async getOne(productId) {
        let connection = null;
        let query = `
        SELECT products.productId, products.productName, products.categoryId, categories.categoryName
        FROM products
        INNER JOIN categories
        ON products.categoryId = categories.categoryId
        WHERE products.productId = "${productId}"
        `;
        try {
            connection = await createDbConnection();
            let [rows, fields] = await connection.execute(query);
            return rows;
        } catch(err) {
            throw err;
        }
    }
    static async getAll(offset, pageSize) {
        let connection = null;
        let query = `
        SELECT products.productId, products.productName, products.categoryId, categories.categoryName  
        FROM products
        INNER JOIN categories
        ON products.categoryId = categories.categoryId
        LIMIT ${pageSize}
        OFFSET ${offset}
        `;
        try {
            connection = await createDbConnection();
            let [rows, fields] = await connection.execute(query);
            return rows;
        } catch(err) {
            throw err;
        }
    }
    static async update(productId, productName, categoryId) {
        let connection = null;
        let query = `
        UPDATE products
        SET productName = ?, categoryId = ?
        WHERE productId = "${productId}"
        `;
        try {
            connection = await createDbConnection();
            let [rows, fields] = await connection.execute(query, [productName, categoryId]);
            return rows;
        } catch(err) {
            throw err;
        }
    }
    static async delete(productId) {
        let connection = null;
        let query = `
        DELETE FROM products
        WHERE productId = "${productId}"
        `;
        try {
            connection = await createDbConnection();
            let [rows, fields] = await connection.execute(query);
            return rows;
        } catch(err) {
            throw err;
        }
    }
}

//Exports
module.exports = { Product };