const { Schema, model } = require('mongoose');

const orderSchema = new Schema({
    name: String,
    comanda: Array
});

const Order = model('Order', orderSchema);

module.exports = Order;