const express = require('express');
const router = express.Router();
const safetyController = require('../domains/controllers/safety.controller');
const settingsController = require('../domains/controllers/settings.controller');
const { protectAdmin } = require('../domains/middlewares/auth');

// Safety Evaluation Channels[cite: 1]
router.get('/safety/summary', protectAdmin, safetyController.getSafetySummary);

// Management Configuration Layers[cite: 1]
router.get('/settings/admins', protectAdmin, settingsController.getAdminAccountsList);
router.get('/settings/audit-logs', protectAdmin, settingsController.getAuditTrailHistory);

module.exports = router;