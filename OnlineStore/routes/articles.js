const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

const multer = require('multer');
const upload = multer(({ storage: multer.memoryStorage() }));

let Cart = require('../models/cart');

//bring in article models
let Article = require('../models/article');


//add route
router.get('/add', function (req, res) {
    res.render('add_article', {
        title: 'add article'
    })
});

//add submit POST route
router.post('/add',  upload.single('image'),
    [
        check('title').isLength({min:1}).trim().withMessage('Title required'),
        check('price').isLength({min:1}).withMessage('Price required'),
        check('price').isInt({min:1}).withMessage('Price must be a number'),
        check('body').isLength({min:1}).trim().withMessage('Body required')
    ],
    (req,res,next)=>{
        const errors = validationResult(req);


        if (!errors.isEmpty()) {
            console.log(errors);
            res.render('add_article',
                {
                    title:'Add Article',
                    errors: errors.mapped()
                });
        }else{

            const image = req.file.buffer.toString('base64');

            let article = new Article();
            article.imagePath = image;
            article.title = req.body.title;
            article.price = req.body.price;
            article.body = req.body.body;


            article.save(err=>{
                if(err)throw err;
                req.flash('success','Article Added');
                res.redirect('/');
            });
        }
    });


//load edit form
router.get('/edit/:id', function (req,res) {
    Article.findById(req.params.id, function (err, article) {
        res.render('edit_article', {
            title: 'Edit Article',
            article: article
        })
    });
});

router.post('/edit/:id', function (req, res) {
    let article = {};
    article.title = req.body.title;
    article.price = req.body.price;
    article.body = req.body.body;

    let query = {_id:req.params.id};

    Article.update(query, article, function (err) {
        if (err){
            console.log(err);
        }else {
            req.flash('success', 'Article Updated');
            res.redirect('/');
        }
    });
});

//get single article
router.get('/:id', function (req,res) {
    Article.findById(req.params.id, function (err, article) {
        res.render('article', {
            article: article
        })
    });
});

//add to cart
router.get('/buy/:id', function (req,res,next) {
    let productId = req.params.id;
    // let cart = new Cart(req.session.cart ? req.session.cart : {});

    Article.findById(productId, function (err, article) {
        if (err){
            return res.redirect('/');
        }else {
            cart.add(article, article.id);
            req.session.cart = cart;
            console.log(req.session.cart);
            res.redirect('/');
        }
    });
});


module.exports = router;
