const comicsModel = require("../models/comics.models");
var fs = require('fs');
const {readdirSync, rename} = require('fs');
const {resolve} = require('path');
var mkdirp = require('mkdirp');
const bcrypt = require("bcrypt");


exports.getComicsList = async (req, res, next) => {
    const comicsList = await comicsModel.find({});
    res.render('./comics/comics', {comics: comicsList});
    console.log(req.body);
}
exports.getComicsListChuaDuyet = async (req, res, next) => {
    const comicsList = await comicsModel.find({});
    res.render('./comics/comics-chuaDuyet', {comics: comicsList});
    console.log(req.body);
}
exports.postAddComic = async (req, res, next) => {
    const comicsList = await comicsModel.find({});
    const imageDirPath = resolve(__dirname, '../tmp');
    const files = fs.readdirSync(imageDirPath);

    var newNameDir = req.body.Name.toLowerCase().replace(" ", "_")
    var dir = './public/uploads/' + newNameDir;

    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);

    } else {
        console.log("Directory already exist");
    }

    fs.rename(
        req.file.destination + req.file.filename,
        './public/uploads/' + newNameDir + '/' + "logo_" + newNameDir + ".png",
        err => console.log(err)
    );
    var nameLogo = "/uploads/" + newNameDir + '/' + "logo_" + newNameDir + ".png";

    const objComic = new comicsModel({
        Name: req.body.Name,
        Logo: nameLogo,
        Author: req.body.Author,
        Description: req.body.Description,
    });

    await objComic.save(function (err) {
        if (err) {
            console.log(err);
        } else {
            console.log("Thêm thành công");

        }
    });

    res.redirect('/comics');

}

exports.postUpdateComics = async (req, res, next) => {
    let dieuKien = {_id: req.body.UpdateID};

    const salt = await bcrypt.genSalt(10);
    console.log(salt)

    const imageDirPath = resolve(__dirname, '../tmp');
    const files = fs.readdirSync(imageDirPath);

    var newNameDir = req.body.UpdateName.toLowerCase().replace(" ", "_")
    var dir = './public/uploads/' + newNameDir;

    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);

    } else {
        console.log("Directory already exist");
    }

    fs.rename(
        req.file.destination + req.file.filename,
        './public/uploads/' + newNameDir + '/' + "logo_" + newNameDir + ".png",
        err => console.log(err)
    );
    var nameUpdateLogo = "/uploads/" + newNameDir + '/' + "logo_" + newNameDir + ".png";



    let duLieu = {
        Name: req.body.UpdateName,
        Logo: nameUpdateLogo,
        Author: req.body.UpdateAuthor,
        Description: req.body.UpdateDescription,
    };
    comicsModel.updateOne(dieuKien, duLieu, function (err, res) {
        if (err) {
            console.log(err);
        } else {
            console.log("Success");
        }

    });
    res.redirect('/comics');
}

exports.postDeleteComics = (req, res, next) => {

    let dieu_kien = {
        _id: req.body.DpInputID
    }

    comicsModel.deleteOne(dieu_kien, function (err) {
        if (err) {
            console.log(err)
        } else {
            console.log('Delete Successful')
        }
    })
    res.redirect('/comics');
}


exports.postAddContent = async (req, res) => {
    let dieu_kien = {
        _id: req.body.AddContentID
    }
    const imageDirPath = resolve(__dirname, '../tmp');
    const files = fs.readdirSync(imageDirPath);

    var newNameDir = req.body.AddContentName.toLowerCase().replace(" ", "_")
    var dir = './public/uploads/' + newNameDir;

    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);

    } else {
        console.log("Directory already exist");
    }
    var nameImages = [];
    await files.forEach((file, index) => {
        fs.rename(
            imageDirPath + `/${file}`,
            './public/uploads/' + newNameDir + '/' + newNameDir + index + ".png",
            err => console.log(err)
        )
    });

    var files_info = req.files;
    nameImages = files_info.map((file, index) => "/uploads/" + newNameDir + '/' + newNameDir + index + ".png");
    req.session.listimg = nameImages;

    let comicObj = {
        Content: nameImages,
    }
    comicsModel.updateOne(dieu_kien, comicObj, function (err, result) {
        if (err) {
            console.log(err);
        } else {
            console.log("Thanh cong" + result);
        }
    });
    return res.redirect('/comics/');
};
