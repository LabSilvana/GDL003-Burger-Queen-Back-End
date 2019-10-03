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

router.post('/products', (req, res) => {
 const { name, price } = req.body;
 if(typeof name != 'string' || typeof price != 'number') return res.status(400).json({success: false, error: 'Bad Request'});
 Product.create({ name, price },(err, product) => {
   if (err) return console.log(err);
   res.send('Saved');
 });
});


router.put(`/products/:productid`, async(req, res)=>{
  Product.updateOne({name: req.body.name}, {$set:{price: req.body.price}},function(err,product) {
    
    if(err){
      console.log("Something wrong when updating data!");
    }
    console.log(product);
    
    return res.send("cambiado")
  ;
  });
});
  
      


    

module.exports = router;