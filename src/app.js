const express = require('express');
const app = express();
const productsRoutes = require('./controllers/productController');
const ordersRoutes = require('./controllers/orderController')
const userRoutes = require('./controllers/authController')
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use(userRoutes);
app.use(productsRoutes);
app.use(ordersRoutes)


module.exports = app;