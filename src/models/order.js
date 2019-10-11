const { Schema, model } = require('mongoose');

const orderSchema = new Schema({
    name: String,
    comanda: Array,
    status: String
});

const Order = model('Order', orderSchema);

module.exports = Order;