const mongoose = require('mongoose');
const Product = require('./models/product');

mongoose.connect('mongodb+srv://churro-latte:1qa2ws3ed@cluster0-ardbn.mongodb.net/churro_latte?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true  
}).then(db => console.log('Database is connected'))
    

