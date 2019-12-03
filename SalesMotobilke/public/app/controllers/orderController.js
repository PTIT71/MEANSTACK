angular.module('orderController', [])
    .controller('orderController', function ($http, orderService) {
        var app = this;
        this.getOrders = function () {
            console.log('Get orders-----------------------');
            orderService.getOrders().then(function (data) {
                console.log(data.data);
                let orders = data.data;
                let no = 1;
                app.data = orders.map((order, index) => {
                    order.no = index + 1;
                    let count = 0;
                    let cost = 0;
                    for (let i = 0; i < order.productInOrder.length; i++) {
                        count += parseInt(order.productInOrder[i].count, 10);
                        cost += parseInt(order.productInOrder[i].count, 10) * parseInt(order.productInOrder[i].cost, 10);
                    }
                    order.count = count;
                    order.cost = cost;
                    return order;
                });
            });

        };
    });