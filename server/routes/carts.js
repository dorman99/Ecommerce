var express = require('express');
var router = express.Router();
var cartController = require('../controllers/carts')

router.post('/', cartController.createCart)
router.put('/add', cartController.addItems)
router.get('/',cartController.all)

module.exports = router