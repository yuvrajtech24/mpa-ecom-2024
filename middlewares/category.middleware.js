// Imports
const { body, param } = require('express-validator');
const { decode } = require("html-entities");

// Middlewares
const editCategoryValidators = () => {
    return ([
        param("id")
            .trim()
            .toLowerCase()
            .isUUID(4).withMessage("Invalid Category Id")
        ])
    }
const addCategoryValidators = () => {
    return ([
        body("categoryName")
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
            .notEmpty().withMessage("Category name empty")
            .matches(/^[a-zA-Z0-9 ]+$/).withMessage("Category name must only contain letters and numbers")
            .isLength({min: 1, max: 100}).withMessage("Category name should have 1 to 100 characters")
        ])
    }
const updateCategoryValidators = () => {
    return ([
        body("categoryName")
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
            .notEmpty().withMessage("Category name should not be empty")
            .matches(/^[a-zA-Z0-9 ]+$/).withMessage("Category name must only contain letters and numbers")
            .isLength({min: 1, max: 100}).withMessage("Category name should have 1 to 100 characters"),
        param("id")
            .trim()
            .toLowerCase()
            .isUUID(4).withMessage("Invalid Category Id")
        ])
    }
const deleteCategoryValidators = () => {
    return ([
        param("id")
            .trim()
            .toLowerCase()
            .isUUID(4).withMessage("Invalid Category Id")
        ])
    }

// Exports
module.exports = {
    editCategoryValidators,
    addCategoryValidators,
    updateCategoryValidators,
    deleteCategoryValidators
}