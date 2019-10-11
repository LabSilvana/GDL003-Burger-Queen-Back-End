const mongoose = require('mongoose');
require ('dotenv').config()


mongoose.connect(process.env.CHURRO_LATE, {
    useNewUrlParser: true,
    useUnifiedTopology: true  
}).then(db => console.log('Database is connected'))
    

