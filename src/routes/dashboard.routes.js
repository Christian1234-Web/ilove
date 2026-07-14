const express = require('express');
const router = express.Router();
const dashboardController = require('../domains/controllers/dashboard.controller');
const { protectAdmin } = require('../domains/middlewares/auth');

// Audit list of charts
router.get('/charts', protectAdmin, dashboardController.getDashboardCharts);

router.get('/stats', protectAdmin, dashboardController.getDashboardStats);



module.exports = router;