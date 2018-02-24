var express = require('express');
var router = express.Router();
var signIn =  require('../controllers/signin')
router.post('/',signIn.signIn)

module.exports = router