angular.module('orderService', [])
    .factory('orderService', function ($http) {
        var orderFactory = {};
        orderFactory.getOrders = function () {
            return $http.get('/api/order/');
        }

        orderFactory.getOrdersByUser = function (userId) {
            return $http.get('/api/order/user/' + userId);
        }


        orderFactory.getOrder = function (orderId) {
            return $http.get('/api/order/' + orderId);
        }

        orderFactory.removeProduct = function (orderId, productId) {
            return $http.delete('/api/order/' + orderId + '/' + productId);
        }

        orderFactory.submitOrder = function (orderId) {
            return $http.post('/api/order/' + orderId);
        }
        return orderFactory;
    });