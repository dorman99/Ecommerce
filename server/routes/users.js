var express = require('express');
var router = express.Router();
var UsersController = require('../controllers/users')
/* GET users listing. */
router.post('/',UsersController.createUsers)
router.put('/:id',UsersController.edituser)
router.get('/:id',UsersController.findOneUsers)
router.get('/',UsersController.findAllCutsomers)
router.delete('/:id',UsersController.deleteOneUsers)

module.exports = router;
