var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var Schema = mongoose.Schema;

var ProductsssssssChema = new Schema({
    name: {type:String, required:true},
    cost: {type:String, required:true},
    count: {type:String, required:true},
    image: {type:String, required:true},
    description: {type:String}
})



module.exports = mongoose.model('Productsssss', ProductsssssssChema);