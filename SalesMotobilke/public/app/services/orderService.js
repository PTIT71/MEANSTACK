angular.module('orderService', [])
    .factory('orderService', function ($http) {
        var orderFactory = {};
        orderFactory.getOrders = function () {
            return $http.get('/api/order/');
        }
        return orderFactory;
    });