const express = require('express');
const router = express.Router();
const safetyController = require('../domains/controllers/safety.controller'); // Adjust the path to your controller file

// Import your admin authentication middleware
const { protectAdmin } = require('../domains/middlewares/auth'); // Adjust the path to your auth middleware

/**
 * @route   GET /api/safety/summary
 * @desc    Retrieve platform security, automated flag, and banning metrics
 * @access  Private (Admin Only)
 */
router.get('/summary', protectAdmin, safetyController.getSafetySummary);
router.post('/ban', protectAdmin, safetyController.createSafetyBan);


module.exports = router;