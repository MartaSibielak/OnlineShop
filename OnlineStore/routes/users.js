const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const passport = require('passport');

//bring in user models
let User = require('../models/user');

// register form
router.get('/register', function (req, res) {
    res.render('register');
});

//register process
router.post('/register', [
        check('name').isLength({min:1}).trim().withMessage('Name is required'),
        check('email').isLength({min:1}).trim().withMessage('Email is required'),
        check('email').isLength({min:1}).isEmail().trim().withMessage('Email is not valid'),
        check('username').isLength({min:1}).trim().withMessage('Username is required'),
        check('password').isLength({min:1}).trim().withMessage('Password is required'),
        check('password2').isLength({min:1}).trim().withMessage('Passwords do not match')
    ],
    function (req,res) {
    // const name = req.body.name;
    // const email = req.body.email;
    // const username = req.body.username;
    // const password = req.body.password;
    // const password2 = req.body.password2;

    // req.checkBody('Name', 'Name is required').notEmpty();
    // req.checkBody('email', 'Email is required').notEmpty();
    // req.checkBody('email', 'Email is not valid').isEmail();
    // req.checkBody('username', 'Username is required').notEmpty();
    // req.checkBody('password', 'Password is required').notEmpty();
    // req.checkBody('password2', 'Passwords do not match').equals(req.body.password);

    let errors = validationResult(req);

    if (!errors.isEmpty()){
        console.log(errors);
        res.render('register', {
            errors: errors.mapped()
        });
    }else {
        let newUser = new User();
            newUser.name = req.body.name;
            newUser.email = req.body.email;
            newUser.username = req.body.username;
            newUser.password = req.body.password;

        bcrypt.genSalt(10, function (err, salt) {
            bcrypt.hash(newUser.password, salt, function (err, hash) {
                if (err){
                    console.log(err);
                }
                newUser.password = hash;
                newUser.save(function (err) {
                    if(err){
                        console.log(err);
                    }else {
                        req.flash('success', 'You are now register and can log in');
                        res.redirect('/users/login');
                    }
                })
            });
        });
    }

});


//login form
router.get('/login', function (req, res) {
    res.render('login');
});

//login process
router.post('/login', function (req, res, next) {
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/users/login',
        failureFlash: true
    })(req,res,next);
});

//logout
router.get('/logout', function (req, res) {
    req.logout();
    req.flash('success', 'You are logged out');
    res.redirect('/users/login');
})

module.exports = router;
