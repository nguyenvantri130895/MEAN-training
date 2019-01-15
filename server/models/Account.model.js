const mongoose = require('mongoose');

let Account = new mongoose.Schema({
    name: {
        type: String,
        required: 'Name can\'t be empty',
    },
    ownerEmail: {
        type: String,
        required: 'Owner email can\'t be empty',
    },
    country: {
        type: String,
        required: 'Country can\'t be empty',
    },
    timezone: {
        type: String,
        required: 'Timezone can\'t be empty',
    },
});

mongoose.model('Account', Account);