const express = require('express');
const router = express.Router();

const ctrlUser = require('../controllers/User.controller');
const ctrlAccount = require('../controllers/Account.controller');
const ctrlContact = require('../controllers/Contact.controller');
const ctrlCampaign = require('../controllers/Campaign.controller');

const jwtHelper = require('../config/jwtHelper');

router.post('/register', ctrlUser.register);
router.post('/authenticate', ctrlUser.authenticate);
router.get('/userProfile', jwtHelper.verifyJwtToken, ctrlUser.userProfile);
router.get('/users', ctrlUser.getUsers);
router.get('/user/:id', ctrlUser.userId);
router.post('/user/:id/assign-role', ctrlUser.assignRole);
router.post('/account/add', ctrlAccount.createAccount);
router.get('/accounts', ctrlAccount.getAccounts);
router.post('/contact/add', ctrlContact.createContact);
router.get('/contacts', ctrlContact.getContacts);
router.get('/contact/:id', ctrlContact.getContactId);
router.post('/contact/:id/edit', ctrlContact.updateContact);
router.post('/campaign/add', ctrlCampaign.createCampaign);
router.get('/campaigns', ctrlCampaign.getCampaigns);

module.exports = router;