const mongoose = require('mongoose');
const Account = mongoose.model('Account');

const _ = require('lodash');

module.exports.getAccounts = (req, res) => {
    Account.find(
        (err, accounts) => {
            if (err) {
                console.log(err);
            }
            else {
                res.json(accounts);
            }
        }
    );
}

module.exports.createAccount = (req, res, next) => {
    var account = new Account;
    account.name = req.body.name;
    account.ownerEmail = req.body.ownerEmail;
    account.country = req.body.country;
    account.timezone = req.body.timezone;
    account.save((err, doc) => {
        if (!err) {
            res.send(doc);
        }
        else {
            return next(err);
        }
    })

}
