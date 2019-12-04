var User = require('../models/user');
var Product = require('../models/product');
var Comment = require('../models/comment');
var jwt = require('jsonwebtoken');
var secret = 'harrypotter';

module.exports = function(router){
    router.post('/users', function(req,res){
        var user = new User();
        user.username = req.body.username;
        user.password = req.body.password;
        user.email = req.body.email;
        
        if( user.username == null ||  user.username == '' ||
        user.password == null || user.password == '' ||
        user.email == null || user.email == '')
        {
            res.json({success:false, message: 'Ensure username, password, email were provided'});
        }
        else
        {
            user.save(function(err){
                if(err)
                {
                    res.json({success:false, message:'Username or Email already exists'});
                }
                else
                {
                    res.json({success:true, message:'Sucesesfully for create user'});
                }
            });
        
        }
           
        
    });

    router.get('/getAllproduct', function(req,res){
        console.log('Get request for all User============');
        Product.find({})
        .exec(function(err,Product){
            if(err){
                console.log("Error retiveing Moto");
            }
            else{
                res.json(Product);
                console.log("Get oke");
            }
        });
    });

    router.get('/product/:id', function(req, res){
        console.log('Get request for a single videos');
        Product.findById(req.params.id)
        .exec(function(err,Product){
            if(err){
                console.log("Error retiveing videos");
            }
            else{
                res.json(Product);
                console.log("Get oke");
            }
        });
    });

    router.post('/comment', function(req,res){
        var comment = new Comment();
        comment.name = req.body.name;
        comment.content = req.body.content;
        comment.idProduct = req.body.idProduct;
        comment.date = req.body.date;
        
       
        comment.save(function(err){
                if(err)
                {
                    res.json({success:false, message:err});
                }
                else
                {
                    res.json({success:true, message:'Sucesesfully for create comment'});
                }
            });
        
        
           
        
    });

    router.get('/getAllComment', function(req,res){
        console.log('Get request for all User============');
        Comment.find({})
        .exec(function(err,Comment){
            if(err){
                console.log("Error retiveing Moto");
            }
            else{
                res.json(Comment);
                console.log("Get oke");
            }
        });
    });

    router.get('/comment/:idProduct', function(req, res){
        console.log('Get request for a single videos');
        Comment.find({
            "idProduct": req.params.idProduct
        })
        .exec(function(err,Comment){
            if(err){
                console.log("Error retiveing videos");
            }
            else{
                res.json(Comment);
                console.log("Get oke");
            }
        });
    });

    router.post('/authenticate', function(req,res){
        User.findOne({username: req.body.username}).select('email username password').exec(function(err,user){
            if(err) throw err;

            if(!user){
                res.json({success:false, message:'Could not authenticate user'});
            }
            else if(user){
                if(req.body.password)
                {
                    var validPassword  = user.comparePassword(req.body.password);
                }
                else{
                    res.json({success:false, message:'No password provided'});
                }
               
                if(!validPassword)
                {
                    res.json({success:false, message:'Could not authenticate password'});
                }
                else{

                    var tokens = jwt.sign({username: user.username, email: user.email}, secret, {expiresIn: 300});
                    res.json({success:true, message:'User authenticated!', token: tokens});
                }

            }
        });
    });

    router.use(function(req, res, next) {
        var token = req.body.token || req.body.query || req.headers['x-access-token'];

        if (token) {
            jwt.verify(token, secret, function(err, decoded) {
                if (err) {
                    res.json({ success: false, message: 'Token invalid', expired: true }); // new variable if token expires
                } else {
                    req.decoded = decoded;
                    next();
                }
            });
        } else {
            res.json({ success: false, message: 'No token provided' });
        }

    });

    router.post('/me', function(req,res){
        res.send( req.decoded);
    });
    return router;
}

