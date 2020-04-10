const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

const multer = require('multer');
const upload = multer(({ storage: multer.memoryStorage() }));


//bring in article models
let article = require('../models/article');

router.post('/articles/cart/', function(req, res){
    console.log(req.body.productId);

    res.send('product added to cart');
});



module.exports = router;
