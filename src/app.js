const express = require('express');
const app = express();
const cors = require('cors');
const productsRoutes = require('./controllers/productController');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use(require('./controllers/authController'));
app.use(productsRoutes);


module.exports = app;