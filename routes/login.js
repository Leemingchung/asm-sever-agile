var express = require('express');
var router = express.Router();
var AuthMiddleware = require('../middleware/auth.midllware')
var loginController = require('../controllers/login.Controller');
/* GET users listing. */
router.get('/',AuthMiddleware.ChuaDangNhap,loginController.login)
router.post('/',AuthMiddleware.ChuaDangNhap,loginController.loginPost)
module.exports = router;
