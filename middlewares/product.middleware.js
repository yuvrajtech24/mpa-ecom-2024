// Imports
const { body, param } = require('express-validator');
const { decode } = require("html-entities");

// Middlewares
const editProductValidators = () => {
    return ([
        param("id")
            .trim()
            .toLowerCase()
            .isUUID(4).withMessage("Invalid Product Id")
        ])
    }
const addProductValidators = () => {
    return ([
        body("productName")
            .trim()
            .escape()
            .stripLow()
            .customSanitizer(input => {
                input = decode(input);
                // remove html tags
                input = input.replace(/<\/?[^>]+(>|$)/g, "");
                // remove special characters
                input = input.replace(/[^a-zA-Z0-9 ]/g, '').replace(/\s+/g, ' ');
                return input;
            })
            .notEmpty().withMessage("Product name empty")
            .matches(/^[a-zA-Z0-9 ]+$/).withMessage("Product name must only contain letters and numbers")
            .isLength({min: 1, max: 100}).withMessage("Product name should have 1 to 100 characters"),
        body("categoryId")
            .trim()
            .toLowerCase()
            .isUUID(4).withMessage("Invalid Category Id")
        ])
    }
const updateProductValidators = () => {
    return ([
        body("productName")
            .trim()
            .escape()
            .stripLow()
            .customSanitizer(input => {
                input = decode(input);
                // remove html tags
                input = input.replace(/<\/?[^>]+(>|$)/g, "");
                // remove special characters
                input = input.replace(/[^a-zA-Z0-9 ]/g, '').replace(/\s+/g, ' ');
                return input;
            })
            .notEmpty().withMessage("Product name should not be empty")
            .matches(/^[a-zA-Z0-9 ]+$/).withMessage("Product name must only contain letters and numbers")
            .isLength({min: 1, max: 100}).withMessage("Product name should have 1 to 100 characters"),
        body("categoryId")
            .trim()
            .toLowerCase()
            .isUUID(4).withMessage("Invalid Category Id"),
        param("id")
            .trim()
            .toLowerCase()
            .isUUID(4).withMessage("Invalid Product Id")
        ])
    }
const deleteProductValidators = () => {
    return ([
        param("id")
            .trim()
            .toLowerCase()
            .isUUID(4).withMessage("Invalid Product Id")
        ])
    }

// Exports
module.exports = {
    editProductValidators,
    addProductValidators,
    updateProductValidators,
    deleteProductValidators
}