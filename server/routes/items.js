var express = require('express');
var router = express.Router();
var itemController = require('../controllers//items')
var auth = require('../middlewares/auth')
/* GET home page. */
//auth udah siap

var cartController = require('../controllers/carts')

router.post('/',itemController.createItem)
router.get('/',itemController.findAllItem)
router.get('/:id',itemController.findOneItem)
router.put('/:id',itemController.editItem)
router.delete("/:id",itemController.deleteItem)



module.exports = router;
