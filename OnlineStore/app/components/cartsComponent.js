let Cart = require('../../models/cart');
let articles = require('../../models/article');

exports.showCart = function (req, res) {
    if (!req.session.cart){
        return res.render('shopping_cart', {articles: null});
    }
    let cart = new Cart(req.session.cart);
    res.render('shopping_cart', {articles: cart.generateArray(), totalPrice: cart.totalPrice})
};

exports.cartWithProductId = function (req,res) {
    let productId = req.params.id;
    let cart = new Cart(req.session.cart ? req.session.cart : {items: {}});

    articles.findById(productId, function (err, article) {
        if (err) {
            return res.redirect('/');
        }
        cart.add(article, article.id);
        req.session.cart = cart;
        console.log(req.session.cart);
        res.redirect('/cart/cart');
    })
};
