const express = require('express');
const router = express.Router();
const JSON = require('circular-json');
const Product = require('../models/product');


router.get('/products', (req, res) => {
    Product.find((err, products) => {
        if (err) return console.error(err); 
        res.send(JSON.stringify(products));
        console.log(products);
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
  Product.findOne({name: req.body.name}, function (err,docs) {
    console.log(docs);
    Product.updateOne({name: req.body.name}, {$set:{price: req.body.price}},function(err,document) {
      if(err){
        console.log("Something wrong when updating data!", err);
        }
        return res.send("changed")
    })   
    return res.send("product don´t exist");
  });  
});
  
     
router.delete('/products/:productId', (req, res) => {
  Product.findByIdAndRemove(req.params.productId)
  .then(product => {
      if(!product) {
          return res.status(404).send({
              message: "Product not found with id " + req.params.productId
          });
      }
      res.send({message: "Product deleted successfully!"});
  }).catch(err => {
      if(err.name === 'ObjectId' || err.price === 'NotFound') {
          return res.status(404).send({
              message: "Product not found with id " + req.params.productId
          });                
      }
      return res.status(500).send({
          message: "Could not delete Product with id " + req.params.productId
      });
  });
});


module.exports = router;