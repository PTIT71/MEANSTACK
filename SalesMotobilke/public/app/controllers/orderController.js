angular.module('orderController', [])
    .controller('orderController', function ($http, orderService) {
        var app = this;
        this.getOrders = function () {
            console.log('Get orders-----------------------');
            orderService.getOrders().then(function (data) {
                console.log(data.data);
                app.data = data.data;
                console.log('------------------');
            });

        };
    });