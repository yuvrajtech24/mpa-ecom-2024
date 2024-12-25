// Imports
const { v4:uuid4 } = require("uuid");

// Models
class Category {
    constructor(id, name) {
        this.id = id;
        this.name = name;
    }

    static create(name, dbConnection, callback) {
        let categoryId = uuid4();
        let categoryName = name;
        let query = `
        INSERT INTO categories 
        (categoryId, categoryName) 
        VALUES ("${categoryId}", "${categoryName}")
        `;
        console.log("category id = ", categoryId);
        console.log("category name = ", categoryName);
        console.log("query = ", query);

        dbConnection.query(query, (err, result) => {
            if(err) {
                console.log("category create error = ",err);
                return callback(err);
            }
            console.log("category create result = ", result);
            return callback(null, result);
        })
    }

    static findOne(id, dbConnection, callback) {
        let categoryId = id;
        let query = `
        SELECT * FROM categories
        WHERE categoryId = "${categoryId}"
        `;
        dbConnection.query(query, (err, result) => {
            if(err) {
                console.log("category findOne error = ", err);
                return callback(err);
            }

            console.log("category findOne result = ", result);
            return callback(null, result);
        });
    }

    static get(dbConnection, callback) {
        const query = `
        SELECT *
        FROM categories
        `
        dbConnection.query(query, (err, result) => {
            if(err) {
                console.log("category get error = ", err);
                return callback(err);
            }
            console.log("category get result = ", result);
            return callback(null, result);
        });
    }

    static update(id, name, dbConnection, callback) {
        let categoryId = id;
        let categoryName = name;
        let query = `
        UPDATE categories
        SET categoryName = "${categoryName}"
        WHERE categoryId = "${categoryId}"
        `;
        dbConnection.query(query, (err, result) => {
            if(err) {
                console.log("category update error = ", err);
                return callback(err);
            }

            console.log("category update result = ", result);
            return callback(null, result);
        });
    }

    static delete(id, dbConnection, callback) {
        let categoryId = id;
        const query = `
        DELETE FROM categories
        WHERE categoryId = "${categoryId}"
        `
        dbConnection.query(query, (err, result) => {
            if(err) {
                console.log("category delete error", err);
                return callback(err);
            }

            console.log("category delete result = ", result);
            callback(null, result);
            
        })
    }
}

// Exports
module.exports = { Category };