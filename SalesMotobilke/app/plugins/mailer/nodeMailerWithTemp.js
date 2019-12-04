var nodeMailer = require("nodemailer");
var hbs = require("nodemailer-handlebars");

var template = '<b>Xin chào, Trạng thái đơn hàng :\n<b>{{ message }}</b></p>';
var sender = 'smtps://huuhung9822%40gmail.com' // The emailto use in sending the email
//(Change the @ symbol to %40 or do a url encoding )
var password = 'bpdlmmgobsvhaqgx' // password of the email to use

var transporter = nodeMailer.createTransport(sender + ':' + password + '@smtp.gmail.com');

const handlebarOptions = {
    viewEngine: {
        extName: '.hbs',
        partialsDir: './view/',
        layoutsDir: './view/',
        defaultLayout: ''
    },
    viewPath: './view/',
    extName: '.hbs',
};

transporter.use('compile', hbs(handlebarOptions))

exports.sendNotifyOrder = function (order) {
    let mailOptions = {
        from: 'huuhung9822@gmail.com', // TODO: email sender
        to: order.email, // TODO: email receiver
        subject: 'Xác nhận đơn hàng',
        text: 'Xin chào, Trạng thái đơn hàng : {{ message }}',
        template: 'index',
        context: {
            message: order.message,
            data: order.data
        } // send extra values to template
    };
    // use template based sender to send a message
    transporter.sendMail(mailOptions, (err, data) => {
        if (err) {
            return console.log(err);
        }
        return console.log('Email sent!!!');
    });
};