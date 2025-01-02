// Imports
const { createDbConnection } = require("../config/db.config");

// Models
class Category {
    constructor(id, name) {
        this.id = id;
        this.name = name;
    }
    static async create(categoryId, categoryName) {
        let connection = null;
        let query = `
        INSERT INTO categories 
        (categoryId, categoryName) 
        VALUES (?,?)
        `;
        try {
            connection = await createDbConnection();
            let [rows, fields] = await connection.execute(query, [categoryId, categoryName]);
            return rows;
        } catch(err) {
            throw err;
        }
    }
    static async getOne(categoryId) {
        let connection = null;
        let query = `
        SELECT * FROM categories
        WHERE categoryId = "${categoryId}"
        `;
        try {
            connection = await createDbConnection();
            let [rows, fields] = await connection.execute(query);
            return rows;
        } catch(err) {
            throw err;
        }
    }
    static async getAll() {
        // console.log("database connection object = ", dbConnection)
        let connection = null;
        const query = `
        SELECT *
        FROM categories
        `;
        try {
            connection = await createDbConnection();
            let [rows, fields] = await connection.execute(query);
            return rows;
        } catch(err) {
            throw err;
        }
    }
    static async update(categoryId, categoryName) {
        let connection = null;
        let query = `
        UPDATE categories
        SET categoryName = ?
        WHERE categoryId = "${categoryId}"
        `;
        try {
            connection = await createDbConnection();
            let [rows, fields] = await connection.execute(query, [categoryName]);
            return rows;
        } catch(err) {
            throw err;
        }
    }
    static async delete(categoryId) {
        let connection = null;
        const query = `
        DELETE FROM categories
        WHERE categoryId = "${categoryId}"
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

// Exports
module.exports = { Category };