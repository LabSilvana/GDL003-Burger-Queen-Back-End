const { Schema, model } = require('mongoose');

const productSchema = new Schema({
    name: String,
    price: Number
});

const Product = model('Product', productSchema);

module.exports = Product;