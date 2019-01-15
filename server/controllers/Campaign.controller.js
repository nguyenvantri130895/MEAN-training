const mongoose = require('mongoose');
const Campaign = mongoose.model('Campaign');

const _ = require('lodash');

module.exports.getCampaigns = (req, res) => {
    Campaign.find(
        (err, campaigns) => {
            if (err) {
                console.log(err);
            }
            else {
                res.json(campaigns);
            }
        }
    );
}

module.exports.createCampaign = (req, res, next) => {
    var campaign = new Campaign({
        accountId: req.body.accountId,
        name: req.body.name,
        created: req.body.created,
        createdBy: req.body.createdBy,
        modified: req.body.modified,
        modifiedBy: req.body.modifiedBy,
        statistics: {
            channels: req.body.statistics.channels,
            emailsRecipients: req.body.statistics.emailsRecipients,
            emailsSent: req.body.statistics.emailsSent,
            smsRecipients: req.body.statistics.smsRecipients,
            smsSent: req.body.statistics.smsSent,  
        }
    })

    campaign.save((err, doc) => {
        if (!err) {
            res.send(doc);
            console.log('success');
        }
        else {
            return next(err);
        }
    })
}

// module.exports.getContactId = (req, res, next) => {
//     Contact.findById(req.params.id, (err, contact) => {
//         if (!contact)
//             return res.status(404).json({ message: 'Contact record not found.' });
//         else
//             return res.status(200).json({ contact: contact });
//     });
// }

// module.exports.updateContact = (req, res) => {
//     Contact.findById(req.params.id, (err, contact) => {
//         if (!contact) {
//             return next(new Error('Could not load Document'));
//         }
//         else {
//             contact.email = req.body.email;
//             contact.mobile = req.body.mobile;
//             contact.firstName = req.body.firstName;
//             contact.lastName = req.body.lastName;
//             contact.birthday = req.body.birthday;
//             contact.gender = req.body.gender;

//             contact.save()
//                 .then(
//                     res.json('Update done')
//                 )
//                 .catch(err => {
//                     res.status(400).send('Update failed');
//                 })
//         }
//     });
// }
