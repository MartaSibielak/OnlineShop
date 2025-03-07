const express = require('express');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const authRouter = require('./routes/admin/auth');
const adminProductsRouter = require('./routes/admin/products');
const productsRouter = require('./routes/products');
const cartsRouter = require('./routes/carts');

const app = express();

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));     //dont need to implement in in our method anymore, its created automaticlly - middleware
app.use(cookieSession({
    keys: ['ggfhfhg']
}));

app.use(authRouter);    //pobieranie routera z pliku auth
app.use(adminProductsRouter);
app.use(productsRouter);
app.use(cartsRouter);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`);
});







// const bodyParser = (req, res, next) => {
//     if (req.method === 'POST') {
//         req.on('data', data => {
//             const parsed = data.toString('utf8').split('&');
//             const formData = {};
//             for (let pair of parsed) {
//                 const [key, value] = pair.split('=');
//                 formData[key] = value;
//             }
//             req.body = formData;
//             next();
//         });
//     }else {
//         next();
//     }
// };
