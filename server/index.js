require('./config/config');
require('./models/db');
require('./config/passportConfig');

const User = require('./models/User.model');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');

const routesIndex = require('./routes/index.route');

const app = express();

//middleware
app.use(bodyParser.json());
app.use(cors());
app.use(passport.initialize());
app.use('/api', routesIndex);

app.use((err, req, res, next) => {
    if(err.name === 'ValidationError'){
        var valErrors = [];
        Object.keys(err.errors).forEach(key => valErrors.push(err.errors[key].message));
        res.status(422).send(valErrors);
    }
})

app.listen(process.env.PORT, () => console.log(`Express server running on port: ${process.env.PORT}` ));