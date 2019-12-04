var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CommentChema = new Schema({
    name: {type:String, required:true},
    content: {type:String, required:true},
    date: {type:String, required:true},
    idProduct: {type:String, required:true}
})



module.exports = mongoose.model('Comment', CommentChema);