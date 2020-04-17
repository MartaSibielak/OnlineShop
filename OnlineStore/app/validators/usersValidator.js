const { check } = require('express-validator');

const usersValidator = [
    check('name').isLength({min:1}).trim().withMessage('Name is required'),
    check('email').isLength({min:1}).trim().withMessage('Email is required'),
    check('email').isLength({min:1}).isEmail().trim().withMessage('Email is not valid'),
    check('username').isLength({min:1}).trim().withMessage('Username is required'),
    check('password').isLength({min:1}).trim().withMessage('Password is required'),
    check('password2').isLength({min:1}).trim().withMessage('Passwords do not match')
];

exports.validator = usersValidator;
