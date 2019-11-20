angular.module('productControllers',[])

.controller('productCtrl', function($http,Product){
    var app =this;
    this.getUser = function(){
        app.errorMsg = false;
        app.loading = true;
        console.log('Submit form register');
        Product.get().then(function(data){
            console.log(data.data);
        });
    };
})
