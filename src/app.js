const express = require('express');
const app = express();
const productsRoutes = require('./controllers/productController');

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use(require('./controllers/authController'));
app.use(productsRoutes);


module.exports = app;