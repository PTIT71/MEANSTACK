var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var Schema = mongoose.Schema;

var UserChema = new Schema({
    username: {type:String, required: true, unique:true},
    password: {type:String, required: true},
    email: {type:String, required:true, lowercase:true, unique:true}
})

UserChema.pre('save', function(next){
    var user = this;
    bcrypt.hash(user.password,null,null,function(err,hash){
        if(err) return next(err);
        user.password= hash;
        next();
    });
});

UserChema.methods.comparePassword = function (password){
    return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', UserChema);