const express = require('express');
const router = express.Router();

const cartsComponent = require("../app/components/cartsComponent");


router.get("/cart", cartsComponent.showCart);
router.get("/cart/:id", cartsComponent.cartWithProductId);


module.exports = router;
