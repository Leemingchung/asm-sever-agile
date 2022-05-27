const mongoose = require('mongoose');

const comicsSchema = new mongoose.Schema({
    Name: String,
    Logo:String,
    Author: String,
    Description: String,
    Content:[String]
},{collection:'Comic'});
const comics = mongoose.model('Comic', comicsSchema);
module.exports = comics;

