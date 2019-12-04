var Order = require('../models/order');
var Product = require('../models/product');
var User = require('../models/user');
var mailer = require('../plugins/mailer/nodeMailerWithTemp');

module.exports = function (router) {
    //Get all order
    router.get('/', async function (req, res) {
        Order.find({})
            .sort({
                '_id': -1
            })
            .exec(function (err, orders) {
                if (err) {
                    console.log("Get all order got exception ");
                    console.log(err);
                } else {
                    res.json(orders);
                }
            });
    });
    //Insert order
    router.post('/', async function (req, res) {
        let userId = req.body.userId;
        User.findById(userId).then(user => {
            Order.findOne({
                    email: user.email,
                    state: 'IN_ORDER'
                })
                .exec(function (err, order) {
                    if (err) {
                        console.log("Get all order got exception ");
                        console.log(err);
                    } else {
                        if (order) {
                            console.log("Current order " + JSON.stringify(order));
                            Product.findById(req.body.productId).then(product => {
                                delete product.count
                                console.log("Product : " + JSON.stringify(product));
                                let contain = false;
                                let productInOrder = order.productInOrder.map((item) => {
                                    if (item.id == product._id.toString()) {
                                        console.log("Increase count " + item.count);
                                        let num = item.count + 1;
                                        item = {
                                            ...item,
                                            count: num
                                        };
                                        contain = true;
                                    }
                                    return item;
                                });
                                console.log("productInOrder : " + JSON.stringify(productInOrder));
                                order.productInOrder = productInOrder;
                                if (!contain) {
                                    let item = {
                                        id: product._id,
                                        name: product.name,
                                        count: 1,
                                        cost: product.cost,
                                        image: product.image,
                                        description: product.description
                                    };
                                    order.productInOrder.push(item);
                                }
                                console.log("Order : " + JSON.stringify(order));
                                order.save(function (err) {
                                    console.log(err);
                                    if (err) {
                                        console.log("Add order got exception : ");
                                        console.log(err);
                                        res.json({
                                            success: false,
                                            message: 'Fail to add order'
                                        });
                                    } else {
                                        res.json({
                                            success: true,
                                            message: 'Sucesesfully for add order'
                                        });
                                    }
                                });
                            }).catch(err => {
                                console.log("Get product by id got exception : ");
                                console.log(err);
                            })
                        } else {
                            console.log("Create new order");
                            Product.findById(req.body.productId).then(product => {
                                delete product.count;
                                console.log("Product : " + JSON.stringify(product));
                                var newOrder = new Order();
                                newOrder.email = user.email;
                                let item = {
                                    id: product._id,
                                    name: product.name,
                                    count: 1,
                                    cost: product.cost,
                                    image: product.image,
                                    description: product.description
                                }
                                newOrder.productInOrder = [item];
                                newOrder.state = 'IN_ORDER';
                                newOrder.save(function (err) {
                                    if (err) {
                                        console.log("Create new order got exception : ");
                                        console.log(err);
                                        res.json({
                                            success: false,
                                            message: 'Fail to create order'
                                        });
                                    } else {
                                        res.json({
                                            success: true,
                                            message: 'Sucesesfully for create order'
                                        });
                                    }
                                });
                            }).catch(err => {
                                console.log("Get product by id got exception : ");
                                console.log(err);
                            })
                        }

                    }
                });
        })

    });
    //Get order
    router.get('/:orderId', async function (req, res) {
        let orderId = req.params.orderId;
        Order.findById(orderId).then((order) => {
            res.json(order);
        }).catch(err => {
            console.log("Get order by id got exception : ");
            console.log(err);
        })
    })
    //Get orders by userId
    router.get('/user/:userId', async function (req, res) {
        let userId = req.params.userId;
        User.findById(userId).then(user => {
            Order.find({
                email: user.email
                // state: 'FINISH_ORDER'
            }).sort({
                '_id': -1
            }).exec((err, orders) => {
                if (err) {
                    return res.json({
                        success: false,
                        message: 'Fail to get orders by user id'
                    });
                }
                return res.json(orders);
            })
        })
    });
    //Get current by user id
    router.get('/user/:userId/current', async function (req, res) {
        let userId = req.params.userId;
        User.findById(userId).then(user => {
            Order.findOne({
                email: user.email,
                state: 'IN_ORDER'
            }).exec((err, order) => {
                if (err) {
                    return res.json({
                        success: false,
                        message: 'Fail to get current orders by user id'
                    });
                }
                return res.json(order);
            })
        })
    });

    router.delete('/:orderId/:productId', async function (req, res) {
        let orderId = req.params.orderId;
        let productId = req.params.productId;
        Order.findById(orderId).then((order) => {
            if (order.state == "IN_ORDER") {
                let productInOrder = order.productInOrder.filter(product => {
                    console.log("Product : " + JSON.stringify(product));
                    if (product.id == productId) {
                        console.log("Remove " + product.id);
                        if (product.count > 1) {
                            console.log("Remove " + product.id + " , count : " + product.count);
                            product.count = product.count - 1;
                            console.log("After remove " + product.id + " , count : " + product.count);
                            return true;
                        } else {
                            console.log("Remove " + product.id);
                            return false;
                        }
                    }
                    console.log("No remove " + product.id);
                    return true;
                });
                order.productInOrder = [...productInOrder];
                console.log(order);
                order.markModified('productInOrder');
                order.save(function (err) {
                    if (err) {
                        res.json({
                            success: false,
                            message: 'Fail to delete product'
                        });
                    } else {
                        res.json({
                            success: true,
                            message: 'Sucesesfully for delete product'
                        });
                    }
                });
            } else {
                res.json({
                    success: false,
                    message: 'Fail to delete product'
                });
            }
        }).catch(err => {
            console.log("Get order by id got exception : ");
            console.log(err);
        })
    });
    router.post('/:orderId', async function (req, res) {
        let orderId = req.params.orderId;
        Order.findById(orderId).then((order) => {
            order.state = 'FINISH_ORDER';
            order.save(function (err) {
                if (err) {
                    res.json({
                        success: false,
                        message: 'Fail to submit product'
                    });
                } else {
                    let email = order.email;
                    let message = "Đã đặt hàng : " + JSON.stringify(order);
                    mailer.sendNotifyOrder({
                        email: email,
                        message: message
                    })
                    res.json({
                        success: true,
                        message: 'Sucesesfully for submit product'
                    });
                }
            });
        }).catch(err => {
            console.log("Get order by id got exception : ");
            console.log(err);
        })
    })
    return router;
}