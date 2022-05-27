const comicsModel = require("../models/comics.models");
const User = require("../models/user.models");

const bcrypt = require("bcrypt");

exports.getComicsList = async (req, res, next) => {
    const comicsList = await comicsModel.find({});
    console.log(comicsList);
    res.send(comicsList);
}
exports.getComics = async (req, res, next) => {
    const comics = await comicsModel.findById(req.params.id);
    res.send(comics);
}
exports.postReg = async (req, res, next) => {
    try {
        const salt = bcrypt.genSaltSync(10);
        const user = new User(req.body);
        user.Password = await bcrypt.hashSync(req.body.Password, salt);
        await user.save();
         const token = await user.generateAuthToken();
        res.status(201).send({ user, token });
    } catch (error) {
        console.log(error);
        res.status(400).send(error);
    }
}

exports.postLogin = async (req, res, next) => {
    try {
        const user = await User.findByCredentials(req.body.Email, req.body.Password);
        if (!user) {
            return res.status(401).send({
                message: "Login failed"
            });
        }
         const token = await user.generateAuthToken();
        res.status(200).send({ user, message: "Login success"});
    } catch (error) {
        res.status(400).send(error);
    }
}
exports.getProfile = (req,res,next)=>{
    res.send(req.user)
}
exports.postEditProfile = async (req,res,next)=>{
    try {
        let dulieu={
            FullName: req.body.FullName,
            UserName: req.body.UserName,
            Email: req.body.Email,
            Password: req.body.Password,
            Role: req.body.Role,
        }
        const user = await User.findByIdAndUpdate(req.body.id, dulieu);
        res.status(200).send({user,msg: "Update success"});
    } catch (error) {
        res.status(400).send(error);
    }
}
exports.postEditPassword = async (req,res,next)=>{
    try {
        const user = await User.findById(req.body.id);
        const isMatch = await bcrypt.compare(req.body.Password, user.Password);
        if(!isMatch){
            return res.status(401).send({
                message: "Password is incorrect"
            });
        }
        const salt = bcrypt.genSaltSync(10);
        user.Password = await bcrypt.hashSync(req.body.NewPassword, salt);
        await user.save();
        res.status(200).send({user,msg: "Update success"});
    } catch (error) {
        res.status(400).send(error);
    }
}
exports.postLogout = async  (req,res,next)=>{
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token != req.token
        })
        await req.user.save()
        res.send("Đăng xuất thành công")
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }

}
exports.postLogoutAll = async (req,res,next)=>{
    try {
        req.user.tokens.splice(0, req.user.tokens.length)
        await req.user.save()
        res.send("Đăng xuất hết rồi")
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
}
