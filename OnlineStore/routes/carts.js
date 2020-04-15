const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

const multer = require('multer');
const upload = multer(({ storage: multer.memoryStorage() }));


//bring in article models
let article = require('../models/article');

// router.get('/cart/:id', function(req, res){
//
//     article.findById(req.params.id, function (err, article) {
//         res.render('edit_article', {
//             title: 'Edit Article',
//             article: article
//         })
//     });
//
//     res.send('product added to cart');
// });


module.exports = router;
