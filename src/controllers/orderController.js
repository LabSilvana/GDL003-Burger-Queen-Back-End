const express = require('express');
const router = express.Router();
const JSON = require('circular-json');
const Order = require('../models/order');

router.get('/orders', (req, res) => {
  const token = req.headers["authorization"]
  if(token == process.env.TOKEN_WAITER) {
    res.send("permiso no autorizado")
    return;
  }
    if(token == process.env.TOKEN_CHEF ){
  const orders = Order.find((err, orders) => {
    if (err) return console.error(err); 
    res.send(JSON.stringify(orders));
    return;
   });
  }
 if(token != process.env.TOKEN_CHEF) {
  res.send("token incorrecto");
  return;
 } 
});

router.post('/orders',(req, res) => {
  const token = req.headers["authorization"]
  if(token == process.env.TOKEN_CHEF){
    res.send("permiso no autorizado")
    return;
  }
  if(token == process.env.TOKEN_WAITER){
    const { name, comanda } = req.body;
    Order.create({ name, comanda },(err, orders) => {
    if (err) return console.log(err);
    res.send('Saved');  
    return;
   });
  }
  if(token != process.env.TOKEN_WAITER){
    res.send("token incorrecto");
  return;
  }
 });

router.delete('/orders/:ordersId', (req, res)=>{
  const token = req.headers["authorization"];
  if(token == process.env.TOKEN_CHEF){
    res.send("permiso no autorizado")
    return;
  }
  if(token == process.env.TOKEN_WAITER){
    console.log(req.params.ordersId);
    Order.findOneAndDelete({"id": req.params.ordersId},)
  .then(orders=> {
    if(!orders) {
      return res.status(404).send({
        message: "Order not found with id " + req.params.ordersId 
      })
    }
    res.send(note);
   })
  }
  if(token != process.env.TOKEN_WAITER){
    res.send("token incorrecto");
  return;
  }
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