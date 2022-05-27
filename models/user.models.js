const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://thopham02hp:thogia100502@cluster0.5g5ri.mongodb.net/Agile').then(r => {
    console.log('Connected to MongoDB');
}).catch(e => {
    console.log('Error: ', e);
});
const jwt = require('jsonwebtoken');
require('dotenv').config();
const chuoi_ky_tu_bi_mat = process.env.TOKEN_SEC_KEY;
const bcrypt = require("bcrypt");


const userSchema = new mongoose.Schema(
    {
        FullName: String,
        Email: String,
        Password: String,
        Role: String,
        IDComicSave: [String],
        IDComicUp: [String],
        DateOfBirth:String,
        Avatar:String,
        GT:String,
        PhoneNumber:String,
        tokens: [{
            token: {
                type: String,
                required: true
            }
        }]
    },
    {collection: 'User'}
);
userSchema.methods.generateAuthToken = async function () {
    const user = this;
    console.log(user);
    const token = jwt.sign({_id: user._id}, chuoi_ky_tu_bi_mat);
    user.tokens = user.tokens.concat({token});
    await user.save();
    return token;
};
userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({Email: email});
    if (!user) {
        throw new Error({error: 'Unable to login'});
    }
    const isMatch = await bcrypt.compare(password, user.Password);
    if (!isMatch) {
        throw new Error({error: 'Unable to login'});
    }
    return user;
};

const User = mongoose.model('User', userSchema);
module.exports = User;
