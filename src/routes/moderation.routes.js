const express = require('express');
const router = express.Router();
const moderationController = require('../domains/controllers/moderation.controller');
const { protectAdmin } = require('../domains/middlewares/auth');

// Photo Moderation Channels[cite: 1]
router.get('/photos', protectAdmin, moderationController.getFlaggedPhotos);
router.post('/photos/moderate', protectAdmin, moderationController.moderatePhoto);

// User Incident Report Ticket Channels[cite: 1] 
router.get('/reports', protectAdmin, moderationController.getUserReports);
router.post('/reports/resolve', protectAdmin, moderationController.resolveUserReport);

module.exports = router;