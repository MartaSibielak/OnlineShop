const express = require('express');
const router = express.Router();
const userValidator = require('./../app/validators/usersValidator');
const usersComponents = require('./../app/components/usersComponents');
const { check } = require('express-validator');

// register form
router.get('/register', usersComponents.registration);

//register process
router.post('/register', userValidator.validator, usersComponents.registerUser);

//login form
router.get('/login', usersComponents.loginForm);

//login process
router.post('/login', usersComponents.loginCheck);

//logout
router.get('/logout', usersComponents.logout);

module.exports = router;
