// Imports
const { v4:uuid4 } = require("uuid");

// Model
class Product {
    constructor(productId, productName) {
        this.productId = productId;
        this.productName = productName;
    }

    static create(name, categoryId, dbConnection, callback) {
        let productId = uuid4();
        let productName = name;
        let query = `
        INSERT INTO products
        (productId, productName, categoryId)
        VALUES ("${productId}", "${productName}", "${categoryId}")
        `;
        dbConnection.query(query, (err, result) => {
            if(err) {
                console.log("product create error = ", err);
                callback(err);
            }

            console.log("product create result = ", result);
            callback(null, result);
        });
    }

    static update(id, name, categoryId, dbConnection, callback) {
        let productId = id;
        let productName = name;
        let query = `
        UPDATE products
        SET productName = "${productName}", categoryId = "${categoryId}"
        WHERE productId = "${productId}"
        `;
        dbConnection.query(query, (err, result) => {
            if(err) {
                console.log("product update error = ", err);
                return callback(err);
            }

            console.log("product update result = ", result);
            return callback(null, result);
        });
    }

    static get(dbConnection, callback) {
        let query = `
        SELECT products.productId, products.productName, products.categoryId, categories.categoryName  
        FROM products
        INNER JOIN categories
        ON products.categoryId = categories.categoryId
        `;

        dbConnection.query(query, (err, result) => {
            if(err) {
                console.log("product get error = ", err);
                return callback(err);
            }

            console.log("product get result = ", result);
            return callback(null, result);
        })
    }

    static findOne(id, dbConnection, callback) {
        let productId = id;
        let query = `
        SELECT products.productId, products.productName, products.categoryId, categories.categoryName
        FROM products
        INNER JOIN categories
        ON products.categoryId = categories.categoryId
        WHERE products.productId = "${productId}"
    `;
        dbConnection.query(query, (err, result) => {
            if(err) {
                console.log("product findOne error = ", err);
                return callback(err);
            }

            console.log("product findOne result = ", result);
            return callback(null, result);
        })
    }

    static delete(id, dbConnection, callback) {
        let productId = id;
        let query = `
        DELETE FROM products
        WHERE productId = "${productId}"
        `;
        dbConnection.query(query, (err, result) => {
            if(err) {
                console.log("product delete error = ", err);
                callback(err);
            }

            console.log("product delete result = ", result);
            callback(null, result);
        })
    }
}

module.exports = { Product };