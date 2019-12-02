var nodeMailer = require("nodemailer");

var template = '<b>Xin chào, Trạng thái đơn hàng :\n<b>{{ message }}</b></p>';
var sender = 'smtps://huuhung9822%40gmail.com' // The emailto use in sending the email
//(Change the @ symbol to %40 or do a url encoding )
var password = 'bpdlmmgobsvhaqgx' // password of the email to use

var transporter = nodeMailer.createTransport(sender + ':' + password + '@smtp.gmail.com');

var sendPwdReminder = transporter.templateSender({
    subject: 'Xác nhận đơn hàng',
    text: 'Xin chào, Trạng thái đơn hàng : {{ message }}',
    html: template
}, {
    from: 'cuahangxemay@mtse.com',
});

exports.sendNotifyOrder = function (order) {
    // use template based sender to send a message
    sendPwdReminder({
        to: order.email
    }, {
        message: order.message
    }, function (err, info) {
        if (err) {
            console.log(err);
        } else {
            console.log(info);
        }
    });
};