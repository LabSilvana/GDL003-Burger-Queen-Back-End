const { Schema, model } = require('mongoose');

const orderSchema = new Schema({
    product: String,
    quantity: Number
    
});

const Order = model('Order', orderSchema);

module.exports = Order;