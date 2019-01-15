const mongoose = require('mongoose');
require('./User.model');
require('./Account.model');
require('./Contact.model');
require('./Campaign.model');

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useCreateIndex: true }, (err) => {
    if(!err){
        console.log('MongoDB database connection established successfully!');
    }
    else{
        console.log('Error in MongoDB connection: ' + JSON.stringify(err, undefined, 2));
    }
});