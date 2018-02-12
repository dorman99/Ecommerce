var express = require('express');
var router = express.Router();
var customersController = require('../controllers/customers')
/* GET users listing. */
router.post('/',customersController.createCustomers)
router.put('/:id',customersController.editCustomer)
router.get('/:id',customersController.findOneCustomers)
router.get('/',customersController.findAllCutsomers)
router.delete('/:id',customersController.deleteOneCustomers)

module.exports = router;
