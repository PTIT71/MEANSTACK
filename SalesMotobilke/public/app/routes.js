angular.module('appRoutes', ['ngRoute'])
    .config(function ($routeProvider, $locationProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'app/views/pages/home.html',
                controller: 'productCtrl',
                controllerAs: 'product'
            })

            .when('/about', {
                templateUrl: 'app/views/pages/about.html'
            })

            .when('/register', {
                templateUrl: 'app/views/pages/users/register.html',
                controller: 'regCtrl',
                controllerAs: 'register'
            })

            .when('/login', {
                templateUrl: 'app/views/pages/users/login.html'
            })

            .when('/logout', {
                templateUrl: 'app/views/pages/users/logout.html'
            })

            .when('/profile', {
                templateUrl: 'app/views/pages/users/profile.html'
            })

            .when('/facebook/:token', {
                templateUrl: "app/views/pages/users/social/social.html",
                controller: 'facebookCtrl',
                controllerAs: 'facebook'
            })

            .when('/facebookerror', {
                templateUrl: "app/views/pages/users/login.html",
                controller: 'facebookCtrl',
                controllerAs: 'facebook'
            })

            .when('/google/:token', {
                templateUrl: "app/views/pages/users/social/social.html",
                controller: 'googleCtrl',
                controllerAs: 'google'
            })

            .when('/googleerror', {
                templateUrl: "app/views/pages/users/login.html",
                controller: 'googleCtrl',
                controllerAs: 'google'
            })

            .when('/view/:id', {
                templateUrl: "app/views/pages/users/detail.html",
            })

            .when('/order', {
                templateUrl: "app/views/pages/order/order.html",
                controller: 'orderController',
                controllerAs: 'order'
            })

            .when('/order/:orderId', {
                templateUrl: "app/views/pages/order/orderDetail.html",
                controller: 'orderController',
                controllerAs: 'order'
            })

            .otherwise({
                redirectTo: '/'
            });

        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });
    });