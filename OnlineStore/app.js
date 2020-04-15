const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');
const config = require('./config/database');
const passport = require('passport');
const MongoStore = require('connect-mongo')(session);


const Cart = require('./models/cart');


mongoose.connect(config.database);
let db = mongoose.connection;

//check connection
db.once('open', function () {
    console.log('connected too mongo db')
});

//check for db errors
db.on('error', function (err) {
    console.log(err)
});

    //init app
const app = express();


//bring in article models
let article = require('./models/article');


//load view engine
app.set('views',path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use('/images', express.static('images'));

//body parser middleware
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse application/json
app.use(bodyParser.json());

///set public folder
app.use(express.static(path.join(__dirname, 'public')));

//
app.use(session({
    secret: 'secretkey',
    resave: true,
    saveUninitialized: true,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
    cookie: { maxAge: 180 * 60 * 1000 }}),
    function(req,res, next){
    res.locals.login = req.isAuthenticated();
    res.locals.session = req.session;
    next();
});

// //express session middleware
// app.use(session({
//     secret: 'secretkey',
//     resave: true,
//     saveUninitialized: true,
//     store: new MongoStore({ mongooseConnection: mongoose.connection }),
//     cookie: { maxAge: 180 * 60 * 1000 }
// }));

// //express authentication ...
// app.use(function (req, res, next) {
//     res.locals.login = req.isAuthenticated();
//     res.locals.session = req.session;
//     next();
// });

//express messages middleware
app.use(require('connect-flash')());
app.use(function (req, res, next) {
    res.locals.messages = require('express-messages')(req, res);
    next();
});

//passport config
require('./config/passport')(passport);
//passport middleware
app.use(passport.initialize());
app.use(passport.session());

app.get('*', function (req, res, next) {
    res.locals.user = req.user || null;
    next();
});

//home router
app.get('/', function(req, res){
    article.find({}, function (err, articles) {
        if (err){
            console.log(err)
        }else {
            res.render('index', {
                title: 'Products',
                articles: articles
            })
        }
    });
});



//add to cart
app.get('/articles/cart/:id', function (req,res) {
    let productId = req.params.id;
    let cart = new Cart(req.session.cart ? req.session.cart : {items: {}});

    article.findById(productId, function (err, article) {
        if (err){
            return res.redirect('/');
        }
        cart.add(article, article.id);
        req.session.cart = cart;
        console.log(req.session.cart);
        res.redirect('/cart');
    })
});

app.get('/cart', function (req, res) {
    if (!req.session.cart){
        return res.render('shopping_cart', {articles: null});
    }
    let cart = new Cart(req.session.cart);
    res.render('shopping_cart', {articles: cart.generateArray(), totalPrice: cart.totalPrice})
});

//route files
let articles = require('./routes/articles');
let users = require('./routes/users');
let cartsRouter = require('./routes/carts');
app.use('/articles', articles);
app.use('/users', users);
app.use('/articles/cart', cartsRouter);



//start server
const port = 3001;
app.listen(port, function () {
    console.log(`server start on port ${port}...`)
});
