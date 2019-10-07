const express = require('express');
const router = express.Router();
const JSON = require('circular-json');
const Order = require('../models/order');

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

router.delete('/orders/:ordersId', (req, res)=>{
  Order.findByIdAndRemove(req.params.ordersId)
  .then(orders=> {
    if(!orders) {
      return res.status(404).send({
        message: "Order not found with id " + req.params.ordersId 
      })
    }
    res.send(note);
   })
  })

 router.put('/orders/:ordersId', (req, res)=>{
   Order.findByIdAndUpdate(req.params.ordersId,{
    product: req.body.product,
    quantity: req.body.quantity
   },{new:true})
   .then (orders=>{
     if(!orders){
      return res.status(404).send({
        message: "Note not found with id " + req.params.noteId
      });
     }
     res.send(orders);
   })
 });
module.exports = router;