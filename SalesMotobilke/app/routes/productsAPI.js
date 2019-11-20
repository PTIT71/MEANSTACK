var Product = require('../models/product');
var jwt = require('jsonwebtoken');

module.exports = function(router){
    router.get('/getAllUsers', function(req,res){
        console.log('Get request for all User');
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

    return router;
}