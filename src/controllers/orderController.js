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

router.post('/orders', (req, res) => {
  const { product, quantity } = req.body;
   Order.create({ product, quantity },(err, orders) => {
    if (err) return console.log(err);
    res.send('Saved');
  });
 });

 router.delete('/orders/:ordersid', (req, res)=>{
  Order.findByIdAndRemove(req.params.ordersid)
  .then(orders=> {
    if(!orders) {
        return res.status(404).send({
            message: "Note not found with id " + req.params.ordersid
        });
      }
      res.send({message: "Note deleted successfully!"});
    });
 });


module.exports = router;