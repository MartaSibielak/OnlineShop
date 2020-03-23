const express = require('express');
// const { check, validationResult } = require('express-validator'); //can name normally like expressVal = require('express-validator') but later need to use expressVal.check()

const { handleErrors } = require('./middlewares');
const usersRepo = require('../../repositories/users');
const signupTemplate = require('../../views/admin/auth/signup');
const signinTemplate = require('../../views/admin/auth/signin');
const { requireEmail, requirePassword, requirePasswordConfirmation, requireEmailExists, requireValidPasswordForUser } = require('./validators');

const router = express.Router();

router.get('/signup', (req, res) => {
    res.send(signupTemplate({ req }));
});


router.post('/signup',
    [requireEmail,
    requirePassword,
    requirePasswordConfirmation],
    handleErrors(signupTemplate),

    async (req, res) => {
    const { email, password } = req.body;

    //cookie handler
    const user = await usersRepo.create({email: email, password: password});
    req.session.userId = user.id;
    res.redirect('/admin/products');
});

router.get('/signout', (req, res) => {
    req.session = null;
    // res.send('You are logged out');
    res.redirect('/signin');
});

router.get('/signin', (req, res) => {
    res.send(signinTemplate({}));
});

router.post('/signin', [
    requireEmailExists,
    requireValidPasswordForUser],
    handleErrors(signinTemplate),
    async (req, res) => {

    const { email } = req.body;

    const user = await usersRepo.getOneBy({ email: email });

    req.session.userId = user.id;

    res.redirect('/admin/products');
});

module.exports = router;    //przesylamy wyniki z routera do innych miejsc w programie
