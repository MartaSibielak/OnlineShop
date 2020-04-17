const { check } = require('express-validator');

const articleValidator = [
    check('title').isLength({min:1}).trim().withMessage('Title required'),
    check('price').isLength({min:1}).withMessage('Price required'),
    check('price').isInt({min:1}).withMessage('Price must be a number'),
    check('body').isLength({min:1}).trim().withMessage('Body required')
];

exports.validator = articleValidator;
