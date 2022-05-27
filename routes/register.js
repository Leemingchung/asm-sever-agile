var express = require('express');
var router = express.Router();
var registerController = require('../controllers/register.Controller');
var AuthMiddleware = require('../middleware/auth.midllware')

/* GET users listing. */
router.get('/',AuthMiddleware.ChuaDangNhap,registerController.register)
router.post('/',AuthMiddleware.ChuaDangNhap,registerController.postRegister)
module.exports = router;
