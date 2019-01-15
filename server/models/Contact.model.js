const mongoose = require('mongoose');

let Contact = new mongoose.Schema({
    email: {
        type: String,
        required: 'Email can\'t be empty',
    },
    mobile: {
        type: String,
        required: 'Mobile can\'t be empty',
    },
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    birthday: {
        type: String,
        required: 'Birthday can\'t be empty',
    },
    gender: {
        type: String,
        required: 'Gender can\'t be empty',
    }
});

mongoose.model('Contact', Contact);