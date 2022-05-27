const jwt = require('jsonwebtoken')
const User = require('../models/user.models')
require('dotenv').config();
const chuoi_ky_tu_bi_mat = process.env.TOKEN_SEC_KEY;
const auth = async(req, res, next) => {
    if(req.header('Authorization') == undefined){
       return  res.status(403).send('Token empty?????');
    }
    const token = req.header('Authorization').replace('Bearer ', '');
    console.log(token)
    const data = jwt.verify(token, chuoi_ky_tu_bi_mat)
    try {
        const user = await User.findOne({ _id: data._id, 'tokens.token': token })
        if (!user) {
            throw new Error()
        }
        req.user = user
        req.token = token
        next()
    } catch (error) {
        console.log(error)
        res.status(401).send({ error: 'Not authorized to access this resource' })
    }

}
module.exports = auth
