angular.module('userApp',
                ['appRoutes',
                'userControllers',
                'userServices', 
                'ngAnimate', 
                'mainController',
                'authServices',
              //  'productControllers',
               // 'productServices',
                
            ])
.config(function($httpProvider){
    $httpProvider.interceptors.push('AuthInterceptors');
});
