var User = require('../models/user');
var Product = require('../models/product');
var Comment = require('../models/comment');
var Order = require('../models/order');
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

    //sadsads
    router.get('/orderssssssss/:id', function(req, res){
        console.log('Get request for a single videos');
        Order.findById(req.params.id)
        .exec(function(err,Order){
            if(err){
                console.log("Error retiveing videos");
            }
            else{
                res.json(Order);
                console.log("Get oke");
            }
        });
    });

    //sadsads
    router.get('/usergettete/:id', function(req, res){
        console.log('Get request for a single videos');
        User.findById(req.params.id)
        .exec(function(err,User){
            if(err){
                console.log("Error retiveing videos");
            }
            else{
                res.json(User);
                console.log("Get oke");
            }
        });
    });

    //-------------------------------------
    router.post('/addOrder', async function (req, res) {
        let userId = req.body.userId;
        console.log(userId);
        console.log("sdfsadsadsadasd");
        User.findById(userId).then(user => {
            console.log(user);
            Order.findOne({
                  
                    email: user.email,
                    state: 'IN_ORDER'
                })
                .exec(function (err, order) {
                    if (err) {
                        console.log("Get all order got exception ");
                        console.log(err);
                    } else {
                        if (order) {
                            console.log("Current order " + JSON.stringify(order));
                            Product.findById(req.body.productId).then(product => {
                                delete product.count
                                console.log("Product : " + JSON.stringify(product));
                                let contain = false;
                                let productInOrder = order.productInOrder.map((item) => {
                                    if (item.id == product._id.toString()) {
                                        console.log("Increase count " + item.count);
                                        let num = item.count + 1;
                                        item = {
                                            ...item,
                                            count: num
                                        };
                                        contain = true;
                                    }
                                    return item;
                                });
                                console.log("productInOrder : " + JSON.stringify(productInOrder));
                                order.productInOrder = productInOrder;
                                if (!contain) {
                                    let item = {
                                        id: product._id,
                                        name: product.name,
                                        count: 1,
                                        cost: product.cost,
                                        image: product.image,
                                        description: product.description
                                    };
                                    order.productInOrder.push(item);
                                }
                                console.log("Order : " + JSON.stringify(order));
                                order.save(function (err) {
                                    console.log(err);
                                    if (err) {
                                        console.log("Add order got exception : ");
                                        console.log(err);
                                        res.json({
                                            success: false,
                                            message: 'Fail to add order'
                                        });
                                    } else {
                                        res.json({
                                            success: true,
                                            message: 'Sucesesfully for add order'
                                        });
                                    }
                                });
                            }).catch(err => {
                                console.log("Get product by id got exception : ");
                                console.log(err);
                            })
                        } else {
                            console.log("Create new order");
                            Product.findById(req.body.productId).then(product => {
                                delete product.count;
                                console.log("Product : " + JSON.stringify(product));
                                var newOrder = new Order();
                                newOrder.email = user.email;
                                let item = {
                                    id: product._id,
                                    name: product.name,
                                    count: 1,
                                    cost: product.cost,
                                    image: product.image,
                                    description: product.description
                                }
                                newOrder.productInOrder = [item];
                                newOrder.state = 'IN_ORDER';
                                newOrder.save(function (err) {
                                    if (err) {
                                        console.log("Create new order got exception : ");
                                        console.log(err);
                                        res.json({
                                            success: false,
                                            message: 'Fail to create order'
                                        });
                                    } else {
                                        res.json({
                                            success: true,
                                            message: 'Sucesesfully for create order'
                                        });
                                    }
                                });
                            }).catch(err => {
                                console.log("Get product by id got exception : ");
                                console.log(err);
                            })
                        }

                    }
                });
        })

    });

    //Get order
    router.get('orders/:orderId', async function (req, res) {
        let orderId = req.params.orderId;
        Order.findById(orderId).then((order) => {
            res.json(order);
        }).catch(err => {
            console.log("Get order by id got exception : ");
            console.log(err);
        })
    });

    router.post('/authenticate', function(req,res){
        User.findOne({username: req.body.username}).select('_id email username password').exec(function(err,user){
            if(err) throw err;
            console.log("authenticate : " + JSON.stringify(user))
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
        }
        
        else {
            res.json({ success: false, message: 'No token provided' });
        }
        

    });

    

    router.post('/me', function(req,res){
        res.send( req.decoded);
    });
    return router;
}

