angular.module('userApp',
                ['appRoutes',
                'userControllers',
                'userServices', 
                'ngAnimate', 
                'mainController',
                'authServices',
                'orderService',
                'orderController'
                
              //  'productControllers',
               // 'productServices',
            ])
.config(function($httpProvider){
    $httpProvider.interceptors.push('AuthInterceptors');
});
