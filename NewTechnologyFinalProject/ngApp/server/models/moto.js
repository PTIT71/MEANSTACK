const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const motoSchema = new Schema({
    name : String,
    cost: String,
    idKind: String,
    idGear:String,
    count:String,
    image:String
});

module.exports = mongoose.model('SanPham', motoSchema, 'SanPham');