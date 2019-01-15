const mongoose = require('mongoose');
const Contact = mongoose.model('Contact');

const _ = require('lodash');

module.exports.getContacts = (req, res) => {
    Contact.find(
        (err, contacts) => {
            if (err) {
                console.log(err);
            }
            else {
                res.json(contacts);
            }
        }
    );
}

module.exports.createContact = (req, res, next) => {
    var contact = new Contact;
    contact.email = req.body.email;
    contact.mobile = req.body.mobile;
    contact.firstName = req.body.firstName;
    contact.lastName = req.body.lastName;
    contact.birthday = req.body.birthday;
    contact.gender = req.body.gender;

    contact.save((err, doc) => {
        if (!err) {
            res.send(doc);
        }
        else {
            return next(err);
        }
    })

}

module.exports.getContactId = (req, res, next) => {
    Contact.findById(req.params.id, (err, contact) => {
        if (!contact)
            return res.status(404).json({ message: 'Contact record not found.' });
        else
            return res.status(200).json({ contact: contact });
    });
}

module.exports.updateContact = (req, res) => {
    Contact.findById(req.params.id, (err, contact) => {
        if (!contact) {
            return next(new Error('Could not load Document'));
        }
        else {
            contact.email = req.body.email;
            contact.mobile = req.body.mobile;
            contact.firstName = req.body.firstName;
            contact.lastName = req.body.lastName;
            contact.birthday = req.body.birthday;
            contact.gender = req.body.gender;

            contact.save()
                .then(
                    res.json('Update done')
                )
                .catch(err => {
                    res.status(400).send('Update failed');
                })
        }
    });
}
