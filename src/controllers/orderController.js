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
    Order.find((err, orders) => {
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
    const { name, comanda, status } = req.body;
    console.log(typeof name, typeof comanda, typeof status);
    
    if(typeof name != 'string' || typeof comanda != 'object' || typeof status != 'string') return res.status(400).json({success: false, error: 'Bad Request'});
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

router.delete('/orders', (req, res)=>{
const token = req.headers["authorization"];
  if(token == process.env.TOKEN_CHEF){
    res.send("permiso no autorizado")
    return
  }
  if(token == process.env.TOKEN_WAITER){
  const {name} = req.body;  
  console.log(name);
  Order.find({name: name},(err, orders) => {
    if (err){
    res.send("nombre no encontrado ")
     return console.error(err); 
    }
    Order.deleteOne({name: name},(err)=>{
      if (err){
      res.send("no se a podido eliminar"); 
      return console.error(err); 
      }
      res.send("delete")
    })
    })
  } 
if(token != process.env.TOKEN_WAITER){
    res.send("token incorrecto");
  return;
}
  });


 router.put('/orders/:ordersId', (req, res)=>{
   Order.findByIdAndUpdate(req.params.ordersId,{
    name: req.body.name,
    comanda: req.body.comanda
   },{new:true})
   .then (orders=>{
     if(!orders){
      return res.status(404).send({
        message: "Product not found with id " + req.params.ordersId
      });
     }
     res.send(orders);
   });
 })

module.exports = router;

