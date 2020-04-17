const { validationResult } = require('express-validator');

let Article = require('../../models/article');

exports.articleAddGet = function(req, res) {
    res.render('add_article', {
        title: 'add article'
    });
};

exports.articleAddPost = function(req, res) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        console.log(errors);
        return res.render('add_article',
            {
                title:'Add Article',
                errors: errors.mapped()
            });
    }

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
};

exports.articleEdit = function(req, res) {
    Article.find({}, function (err, article) {
        if (err){
            console.log(err);
            return; //TODO return page with error
        }

        res.render('article', {
            title: 'Admin edit panel',
            articles: article
        });
    });
};

exports.articleEditId = function(req, res) {
    Article.findById(req.params.id, function (err, article) {
        res.render('edit_article', {
            title: 'Edit Article',
            article: article
        })
    });
};

exports.submitEditedArticle = function(req, res) {
    let article = {};
    article.title = req.body.title;
    article.price = req.body.price;
    article.body = req.body.body;

    let query = {_id:req.params.id};

    Article.update(query, article, function (err) {
        if (err){
            console.log(err);
            return; //TODO return page with error
        }

        req.flash('success', 'Article Updated');
        res.redirect('/');
    });
};

exports.articleDetails = function(req, res) {
    Article.findById(req.params.id, function (err, articles) {
        res.render('article', {
            title: 'show one article',
            articles: articles
        })
    });
};

exports.deleteArticle = function(req, res) {
    let article = {};

    let query = {_id:req.params.id};

    Article.deleteOne(query, article, function (err) {
        if (err){
            console.log(err);
            return;
        }

        req.flash('success', 'Article Deleted');
        res.redirect('/');
    });
};

