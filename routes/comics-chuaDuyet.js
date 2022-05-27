var express = require('express');
var router = express.Router();
var multer = require('multer');
var comicsController = require('../controllers/comics.controller');
var AuthMiddleware = require('../middleware/auth.midllware')

var uploadLogo = multer( { dest: './tmp/'});

router.get('/',AuthMiddleware.YeuCauDangNhap,comicsController.getComicsListChuaDuyet)
router.post('/add',uploadLogo.single('Logo'),comicsController.postAddComic)
router.post('/edit',uploadLogo.single('UpdateLogo'),comicsController.postUpdateComics)
router.post('/delete',comicsController.postDeleteComics)


var uploader = multer( { dest: './tmp/'});
router.post('/add-content',uploader.array('AddContentImage'),comicsController.postAddContent)

module.exports = router;
