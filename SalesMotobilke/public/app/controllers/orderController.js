angular.module('orderController', [])
    .controller('orderController', function ($routeParams, $location, orderService) {
        var app = this;
        this.getOrders = function () {
            console.log('Get orders-----------------------');
            orderService.getOrders().then(function (data) {
                console.log(data.data);
                let orders = data.data;
                let no = 1;
                app.orders = orders.map((order, index) => {
                    if (order.productInOrder.length == 0) {
                        return null;
                    }
                    order.no = no++;
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

        this.getOrder = function () {
            console.log('Get order-----------------------');
            let orderId = $routeParams.orderId;
            orderService.getOrder(orderId).then(function (data) {
                console.log(data.data);
                let order = data.data;
                let count = 0;
                let cost = 0;
                for (let i = 0; i < order.productInOrder.length; i++) {
                    count += parseInt(order.productInOrder[i].count, 10);
                    cost += parseInt(order.productInOrder[i].count, 10) * parseInt(order.productInOrder[i].cost, 10);
                }
                order.count = count;
                order.cost = cost;

                app.order = order;
            });
        };

        this.submitOrder = function (orderId) {
            console.log('Submit order-----------------------');
            orderService.submitOrder(orderId).then(function (data) {
                console.log(data.data);
                $location.path('/');
            });
        };

        this.back = function () {
            $location.path('/order/');
        }

        this.goHome = function () {
            $location.path('/');
        }

        this.viewOrder = function (orderId) {
            console.log('view order ' + orderId);
            $location.path('/order/' + orderId);
        }

        this.removeProduct = function (orderId, productId) {
            console.log('Remove product-----------------------' + orderId + '/' + productId);
            orderService.removeProduct(orderId, productId).then(function (dataRemove) {
                console.log(dataRemove.data);
                orderService.getOrder(orderId).then(function (data) {

                    // console.log(data.data);
                    let order = data.data;
                    if (order.productInOrder.length == 0) {
                        app.order = null;
                        $location.path('/order/');
                        return;
                    }
                    let count = 0;
                    let cost = 0;
                    for (let i = 0; i < order.productInOrder.length; i++) {
                        count += parseInt(order.productInOrder[i].count, 10);
                        cost += parseInt(order.productInOrder[i].count, 10) * parseInt(order.productInOrder[i].cost, 10);
                    }
                    order.count = count;
                    order.cost = cost;
                    app.order = order;
                });
            })
        };
    });