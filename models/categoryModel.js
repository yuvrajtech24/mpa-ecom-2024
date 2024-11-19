// Imports
const { dbConnection } = require("../index");
const { v4:uuid4 } = require("uuid");

class Category {
    constructor(id, name) {
        this.id = id;
        this.name = name;
    }

    static create(name) {
        this.id = uuid4();
        this.name = name;
        const query = `
        INSERT INTO categories 
        (categoryId, categoryName) 
        VALUES (${this.id, this.name})
        `;
        dbConnection.query(query, (err, result) => {
            if(err) console.log("category create error = ",err);
            console.log("category create result = ", result);
        })
    }

    static patch(id, name) {
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

    static get() {
        const query = `
        SELECT *
        FROM categories
        `
        dbConnection.query(query, (err, result) => {
            if(err) console.log("category get error = ", err);
            console.log("category get result = ", result);
        });
    }

    static delete(id) {
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