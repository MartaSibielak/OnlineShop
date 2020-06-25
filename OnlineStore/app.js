const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');
const config = require('./config/database');
const passport = require('passport');
const MongoStore = require('connect-mongo')(session);


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




//routs
let articles = require('./routes/articles');
let users = require('./routes/users');
let carts = require('./routes/carts');
let homePage = require('./routes/home');

app.use('/articles', articles);
app.use('/users', users);
app.use('/cart', carts);
app.use('/', homePage);



//start server
const port = 3000;
app.listen(port, function () {
    console.log(`server start on port ${port}...`)
});
