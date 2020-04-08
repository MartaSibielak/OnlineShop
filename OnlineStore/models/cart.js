// module.exports = function Cart(oldCart) {
//     this.article = oldCart.articles || {};
//     this.totalQty = oldCart.totalQty || 0;
//     this.totalPrice = oldCart.totalPrice;
//
//     this.add = function (article, id) {
//         let storedItem = this.article[id];
//         if (!storedItem){
//             storedItem = this.article[id] = {articles: article, qty: 0, price: 0};
//         }
//         storedItem.qty++;
//         storedItem.author = storedItem.article.author * storedItem.qty;
//         this.totalQty++;
//         this.totalPrice += storedItem.article.author;
//     };
//     this.generateArray = function () {
//         let arr = [];
//         for (let id in this.article){
//             arr.push(this.article[id]);
//         }
//         return arr;
//     }
// };
