const validationResult = require('express-validator');
let User = require('../../models/user');
const bcrypt = require('bcryptjs');
const passport = require('passport');


exports.registration = function (req, res) {
    res.render('register');
};

exports.registerUser = function (req,res) {
    let errors = validationResult.validationResult(req);

    if (!errors.isEmpty()) {
        console.log(errors);
        res.render('register', {
            errors: errors.mapped()
        });
    } else {
        let newUser = new User();
        newUser.name = req.body.name;
        newUser.email = req.body.email;
        newUser.username = req.body.username;
        newUser.password = req.body.password;

        bcrypt.genSalt(10, function (err, salt) {
            bcrypt.hash(newUser.password, salt, function (err, hash) {
                if (err) {
                    console.log(err);
                }
                newUser.password = hash;
                newUser.save(function (err) {
                    if (err) {
                        console.log(err);
                    } else {
                        req.flash('success', 'You are now register and can log in');
                        res.redirect('/users/login');
                    }
                })
            });
        });
    }
};

exports.loginForm = function (req, res) {
    res.render('login');
};

exports.loginCheck = function (req, res, next) {
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/users/login',
        failureFlash: true
    })(req,res,next);
};

exports.logout = function (req, res) {
    req.logout();
    req.flash('success', 'You are logged out');
    res.redirect('/users/login');
};

