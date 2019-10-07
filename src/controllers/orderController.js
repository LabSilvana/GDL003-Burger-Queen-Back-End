const express = require('express');
const router = express.Router();
const JSON = require('circular-json');
const Order = require('../models/Order');

router.get('/orders', (req, res) => {
  const orders = Order.find((err, orders) => {
    if (err) return console.error(err); 
    res.send(JSON.stringify(orders));
  });
});

module.exports = router;