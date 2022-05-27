const User = require("../models/user.models");
const bcrypt = require("bcrypt");
exports.register=(req,res,next)=>{
    res.render('./user/register')
}
exports.postRegister = async (req,res,next)=>{
    if(req.body.password !== req.body.passwordCF){
        return res.render('./user/register.hbs',{msg:'Mat khau khong trung khop', body: req.body});
    }
    var role= req.body.AddRole;
    const salt = await bcrypt.genSalt(10);
    console.log(salt)
    let dateOfBirth = req.body.DayOfBirth+"/"+req.body.MonthOfBirth+"/"+req.body.YearOfBirth;


    let objUser = {
        FullName: req.body.FullName,
        Password:await bcrypt.hash(req.body.password, salt) ,
        Email:req.body.Email,
        GT:req.body.radioGT,
        DateOfBirth:dateOfBirth,
        PhoneNumber:req.body.SDT,
        Role: role,
    }
    // ghi vào CSDL:
    await User.create(objUser,function (err){
        if(err)
            console.log(err)
        else{
            console.log("đăng kí thành công và đã ghi vào db")
        }

    })
    res.redirect('/login')
}
