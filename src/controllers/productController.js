const express = require('express');
const router = express.Router();
const JSON = require('circular-json');
const Product = require('../models/product');


router.get('/products', (req, res) => {
    Product.find((err, products) => {
        if (err) return console.error(err); 
        res.send(JSON.stringify(products));
      }); 
  });

router.post('/products', (req, res) => {
  const { name, price, img } = req.body;
  if(typeof name != 'string' || typeof price != 'number') return res.status(400).json({success: false, error: 'Bad Request'});
  Product.create({ name, price, img },(err, product) => {
    if (err) return console.log(err);
    res.send('Saved');
  }); 
});


router.put('/products/:productId',(req, res) => {
    // Validate Request
    if(!req.body.price) {
        return res.status(400).send({
            message: "product content can not be empty"
        });
    }

    // Find note and update it with the request body
    Product.findByIdAndUpdate(req.params.productId, {
        name: req.body.name || "Untitled Product",
        price: req.body.price
    }, {new: true})
    .then(product => {
        if(!product) {
            return res.status(404).send({
                message: "Note not found with id " + req.params.productId
            });
        }
        res.send(product);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Product not found with id " + req.params.productId
            });                
        }
        return res.status(500).send({
            message: "Error updating product with id " + req.params.productId
        });
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