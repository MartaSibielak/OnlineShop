const article = require('../../models/article');

exports.home = function(req, res) {
    article.find({}, function (err, article) {
        if (err) {
            console.log(err)
        } else {
            res.render('index', {
                title: 'Products',
                articles: article
            })
        }
    })
};
