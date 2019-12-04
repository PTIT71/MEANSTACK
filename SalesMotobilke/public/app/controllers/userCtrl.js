
angular.module('userControllers',[])

.controller('regCtrl', function($http, $location,$timeout,User){

    var app =this;
    regData = '';

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
                    $location.path('/login');
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
.controller('productCtrl', function($http,Products, ProductOnly){
    var app =this;
    this.getAllProduct = function(){
        app.errorMsg = false;
        app.loading = true;
        console.log('=================gfjksdabfjksafbkjasdbfjsakdbfkjsadbfjkadsbjfksabdj-----------------------');
        Products.get().then(function(data){
            console.log(data.data);
            app.dataProduct = data.data;
            console.log('------------------');
            console.log(app.dataProduct);
        });
       
    };

    
})

/*
.controller('OnlyProduct', function(ProductOnly) {
    var app =this;
    this.getOnlyProduct = function(){
        app.errorMsg = false;
        app.loading = true;
        console.log('=================gfjksdabfjksafbkjasdbfjsakdbfkjsadbfjkadsbjfksabdj-----------------------');
        ProductOnly.get('5dd11f95181d2c194ca5b624').then(function(data){
            console.log(data.data);
            app.dataonly = data.data;
            console.log('------------------');
            console.log(app.dataonly);
        });
       
    };
  });
  */
 .controller('OnlyProduct',  function(OrderProduct, Comment, ProductComment, ProductOnly, $scope, $routeParams,$location, $window) {
   
     console.log("Hellooooooooo");
     $scope.ids = $routeParams.ids;
     //$scope.productONLY.CommentData.name = "sfsdfsdf";
    // $scope.productONLY.CommentData.idProduct = $routeParams.ids;
    // $scope.productONLY.CommentData.date = new Date();
     var app =this;
     /*
        this.getOnlyProduct = function(){
            app.errorMsg = false;
            app.loading = true;
            console.log('=================gfjksdabfjksafbkjasdbfjsakdbfkjsadbfjkadsbjfksabdj-----------------------');
            ProductOnly.get('5dd11f95181d2c194ca5b624').then(function(data){
                console.log(data.data);
                app.dataonly = data.data;
                console.log('------------------');
                console.log(app.dataonly);
            });
        
        };
*/
      
       this.getOnlyProduct = function(){
        app.errorMsg = false;
        app.loading = true;
            ProductOnly.get($scope.ids).then(function(data){
                console.log(data.data);
                app.dataonly = data.data;
                console.log('-------la la lal a aaaaaaaaaaaaa-----------');
                console.log(app.dataonly);
            });
        }

        this.getComment = function()
        {
            app.errorMsg = false;
            app.loading = true;
            ProductComment.get($scope.ids).then(function(data){
                    console.log(data.data);
                    app.dataComment = data.data;
                    var day = new Date();
                    
                    app.dateDay = day.getFullYear()+'-'+(day.getMonth()+1)+'-'+day.getDate();
                    console.log('-------la la lal a-----------');
                    console.log(app.dataComment);
                    console.log('date' +  app.dateDay);
                });
        }

     
        this.doComment = function(CommentData){
            console.log('Submit form comment');
            console.log(app.CommentData);
            Comment.create(app.CommentData).then(function(data){
                $window.location.reload();
                console.log(data.data.success);
                console.log(data.data.message);
            });
        }

       

        this.SelectProduct = function(OrderData){
            console.log('Submit form order');
            console.log(app.OrderData);
            OrderProduct.create(app.OrderData).then(function(data){
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

    });
