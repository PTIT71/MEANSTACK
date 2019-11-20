
angular.module('userControllers',[])

.controller('regCtrl', function($http, $location,$timeout,User){

    var app =this;

    this.regUser = function(regData){

        app.errorMsg = false;
        app.loading = true;
        console.log('Submit form register');
        User.create(app.regData).then(function(data){
            console.log(data.data.success);
            console.log(data.data.message);
            if(data.data.success)
            {
                app.loading =false;
                app.successMsg = data.data.message + '.... Redirecting';
                $timeout(function(){
                    $location.path('/');
                },3000)
                
            }
            else
            {
                app.loading =false;
                app.errorMsg = data.data.message;
            }
        });
    };
})

.controller('facebookCtrl', function($routeParams, Auth, $location, $window){

    var app = this;
    if($window.location.pathname == '/facebookerror'){
        app.errorMsg = 'Not found email facebook';
    }else{
        Auth.facebook($routeParams.token);
        $location.path('/');
        console.log($routeParams);
    }
   

})

.controller('googleCtrl', function($routeParams, Auth, $location, $window){

    var app = this;
    if($window.location.pathname == '/googleerror'){
        app.errorMsg = 'Not found email google';
    }else{
        Auth.facebook($routeParams.token);
        $location.path('/');
        console.log($routeParams);
    }
   

})
.controller('productCtrl', function($http,Product){
    var app =this;
    this.getUser = function(){
        app.errorMsg = false;
        app.loading = true;
        console.log('Submit form register-----------------------');
        Product.get().then(function(data){
            console.log(data.data);
            app.dataProduct = data.data;
            console.log('------------------');
            console.log(app.dataProduct);
        });
       
    };
});