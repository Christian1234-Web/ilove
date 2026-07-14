const express = require('express');
const router = express.Router();
const configController = require('../domains/controllers/config.controller');
const { protectAdmin } = require('../domains/middlewares/auth');

// Interests Management[cite: 1]
router.get('/interest/all', protectAdmin, configController.getAllInterests);
router.post('/interest/tag', protectAdmin, configController.createInterestTag);
router.delete('/interest/tag/:id', protectAdmin, configController.deleteInterestTag);

// Banking Configurations[cite: 1]
router.put('/banking/bank/status/:id', protectAdmin, configController.toggleBankStatus);

// Notifications Campaign Operations[cite: 1]
router.post('/notification/broadcast', protectAdmin, configController.broadcastPushNotification);

module.exports = router;