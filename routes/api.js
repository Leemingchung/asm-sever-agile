
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const ApiController = require('../controllers/Api.controller');
const auth = require('../middleware/api.auth.midlware')
router.get('/', (req, res) => {
    res.send('API works');
});
router.get('/user',function (req,res,next) {
    mongoose.connect('mongodb+srv://thopham02hp:thogia100502@cluster0.5g5ri.mongodb.net/Agile')
    const db = mongoose.connection;
    db.collection('User').find().toArray(
        function (err, User){
            if (err){
                res.sendStatus(500)
                console.log(err)
            }else {
                res.send(User)
            }
        }
    )
});

router.get('/Comics', ApiController.getComicsList);
router.get('/Comics/:id', ApiController.getComics);
router.get('/user/profile',auth,ApiController.getProfile );
router.post('/login', ApiController.postLogin);
router.post('/reg',ApiController.postReg);
router.post('/user/edit',ApiController.postEditProfile);
router.post('/user/editPass',ApiController.postEditPassword);
router.post('/user/logout',auth,ApiController.postLogout ) ;
router.post('/user/logout-all',auth,ApiController.postLogoutAll ) ;
module.exports = router;




