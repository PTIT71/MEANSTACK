var mongoose = require('mongoose');
var Schema = mongoose.Schema;
let timestampPlugin = require('./plugins/timestamp');

var orderSchema = new Schema({
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true
    },
    productInOrder: {
        type: Array,
        required: true,
    },
    state: {
        type: String,
        required: true
    }
})
orderSchema.plugin(timestampPlugin);
module.exports = mongoose.model('Order', orderSchema);