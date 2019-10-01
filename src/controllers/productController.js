const express = require('express');
const router = express.Router();
const JSON = require('circular-json');

const Product = require('../models/product');

router.get('/products', (req, res) => {
    const products = Product.find((err, products) => {
        if (err) return console.error(err); 
        res.send(JSON.stringify(products));
      });
      
});

module.exports = router;