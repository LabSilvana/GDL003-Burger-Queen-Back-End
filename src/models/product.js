const { Schema, model } = require('mongoose');

const productSchema = new Schema({
    name: String,
    price: Number,
    img: String,
    category: String
});

const Product = model('Product', productSchema);

module.exports = Product;