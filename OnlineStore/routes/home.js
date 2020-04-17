const express = require('express');
const router = express.Router();

const homeComponent = require("../app/components/homeComponent");

//home router
router.get('/', homeComponent.home);

module.exports = router;

