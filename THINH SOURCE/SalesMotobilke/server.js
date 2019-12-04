var express = require('express');
var app = express();
var port = 3100;
var morgan = require('morgan');
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var bodyParser= require('body-parser');
var router = express.Router();
var appRoutes = require('./app/routes/api')(router);
var path = require('path');
var Comment =  require('./app/models/comment');
var passport = require('passport');
var social = require("./app/passport/passport")(app, passport);
const connString = "mongodb+srv://liemtt:hQAvvsS1GZhyctg8@cluster0-5yexi.mongodb.net/CuaHangXeMay?retryWrites=true&w=majority";

app.use(morgan('dev'));
//parsing appliction or json
app.use(bodyParser.json());
//form url lencaded
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));
app.use('/api',appRoutes);
mongoose.connect(connString, function(err){
    if(err){
        console.log('Not connected Database: ' + err)
    }
    else{
        console.log('Successfully connected to MongoDB');
    }
});

app.get('*', function(req,res){
   res.sendFile(path.join(__dirname + '/public/app/views/index.html'));
});



app.listen(port, function(){
    console.log('------Runing on  ' + port + '------');
});