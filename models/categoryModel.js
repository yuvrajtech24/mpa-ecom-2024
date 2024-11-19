// Imports
// const { dbConnection } = require("../index");
const { v4:uuid4 } = require("uuid");

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

    static patch(id, dbConnection, name) {
        this.id = id;
        this.name = name;
        const query = `
        UPDATE categories 
        SET name = ${this.name}
        WHERE categoryId = ${this.id}
        `
        dbConnection.query(query, (err, result) => {
            if(err) console.log("category patch error = ", err);
            console.log("category patch result = ", result);
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

    static delete(id, dbConnection) {
        this.id = id;
        const query = `
        DELETE FROM categories
        WHERE categoryId = ${this.id}
        `
        dbConnection.query(query, (err, result) => {
            if(err) console.log("category delete error = ", err);
            console.log("category delete result = ", result);
        })
    }
}

module.exports = { Category };