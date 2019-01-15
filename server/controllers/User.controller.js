const mongoose = require('mongoose');
const passport = require('passport');

const User = mongoose.model('User');
const Account = mongoose.model('Account');

const _ = require('lodash');

const defaultPassword = '12345';
const defaultRole = 'Standard';

module.exports.register = (req, res, next) => {
    var user = new User;
    user.fullName = req.body.fullName;
    user.email = req.body.email;
    user.password = defaultPassword;
    user.accountId = req.body.accountId;
    if (req.body.role === '') {
        user.role = defaultRole;
    } else {
        user.role = req.body.role;
    }
    user.save((err, doc) => {
        if (!err) {
            res.send(doc);
        }
        else {
            if (err.code === 11000) {
                res.status(422).send(['Duplicate email address.']);
            }
            else {
                return next(err);
            }
        }
    })
}

module.exports.authenticate = (req, res, next) => {
    // call for passport authentication
    passport.authenticate('local', (err, user, info) => {
        // error from passport middleware
        if (err) return res.status(400).json(err);
        // registered user
        else if (user) return res.status(200).json({ 'token': user.generateJwt() });
        // unknown user or wrong password
        else return res.status(404).json(info);
    })(req, res);
}

module.exports.userProfile = (req, res, next) => {
    User.findOne({ _id: req._id },
        (err, user) => {
            if (!user)
                return res.status(404).json({ message: 'User record not found.' });
            else
                return res.status(200).json({ user: _.pick(user, ['_id', 'fullName', 'email', 'roles']) });
        }
    );
}

module.exports.userId = (req, res, next) => {
    User.findById(req.params.id, (err, user) => {
        if (!user)
            return res.status(404).json({ message: 'User record not found.' });
        else
            return res.status(200).json({ user: _.pick(user, ['email', 'roles']) });
    });
}

module.exports.getUsers = (req, res) => {
    User.find(
        (err, users) => {
            if (err) {
                console.log(err);
            }
            else {
                res.json(users);
            }
        }
    );
}

module.exports.assignRole = (req, res) => {
    User.updateOne(
        { _id: req.params.id },
        { $set: { roles: req.body.roles } }
    )
        .then(() => {
            res.json('Update done');
        })
        .catch((err) => {
            console.log('Error: ' + err);
        })
}