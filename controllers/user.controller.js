const bcrypt = require("bcrypt");
const UserModel = require("../models/user.models");
const {resolve} = require("path");
const fs = require("fs");
const comicsModel = require("../models/comics.models");
exports.getUserList= async (req,res,next)=>{
    const listUser = await UserModel.find({});
    res.render('./user/user', {user :listUser})
}
exports.postAddUser = async (req,res,next)=>{
    const listUser = await UserModel.find({});
    var role= req.body.AddRole;

    const imageDirPath = resolve(__dirname, '../tmp');
    const files = fs.readdirSync(imageDirPath);

    var newNameDir = req.body.FullName.toLowerCase().replace(" ", "_")
    var dir = './public/uploads/' + newNameDir;

    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);

    } else {
        console.log("Directory already exist");
    }

    fs.rename(
        req.file.destination + req.file.filename,
        './public/uploads/' + newNameDir + '/' + "avatar_" + newNameDir + ".png",
        err => console.log(err)
    );
    var linkAvatar = "/uploads/" + "avatar_" + newNameDir + '/' + "avatar_" + newNameDir + ".png";


    let dateOfBirth = req.body.DayOfBirth+"/"+req.body.MonthOfBirth+"/"+req.body.YearOfBirth;
    const salt = await bcrypt.genSalt(10);
    console.log(salt)
    if(req.body.Password !== req.body.CPassword){
        return res.render('./user/user',{msg:'Xác nhận password không đúng', body: req.body});
    }
    const objUser = new UserModel({
        FullName: req.body.FullName,
        Email: req.body.Email,
        Password: await bcrypt.hash(req.body.Password,salt),
        Role: role,
        DateOfBirth:dateOfBirth,
        Avatar:linkAvatar,
        GT:req.body.radioGT,
        PhoneNumber:req.body.SDT,
    });
    await objUser.save(function (err) {
        if (err) {
            console.log(err);
        }
        else {
            console.log("Thêm thành công!");
        }
    });
    res.redirect('/user');
}
exports.postUpdateUser = async (req,res,next)=>{
    console.log('Request: Post /user/edit')
    console.log(req.body);
    let dieuKien = {_id: req.body.UpInputID};
    const salt = await bcrypt.genSalt(10);
    console.log(salt)
    let duLieu= {
        FullName: req.body.UpInputFullName,
        UserName: req.body.UpInputUserName,
        Email: req.body.UpInputEmail,
        Password: await bcrypt.hash(req.body.UpInputPassword,salt),
        Role: req.body.UpInputRole,
    };
    UserModel.updateOne(dieuKien, duLieu, function (err,res) {
        if (err) {
            console.log(err);
        }
        else {
            console.log("Success");
        }

    });
    res.redirect('/user');
}
exports.postDeleteUser = (req, res, next)=>{

    let dieu_kien = {
        _id : req.body.DpInputID
    }

    UserModel.deleteOne(dieu_kien, function (err){
        if(err)
        {
            console.log(err)
        }else
        {
            console.log('xóa thành công')
        }
    })
    res.redirect('/user');
    res.writeHead(301, {
        Location: "http://" + req.headers["host"] + "/user"
    });
}




