const express = require('express');
const router = express.Router();
const adminAuthController = require('../domains/controllers/adminAuth.controller');

// Import your custom authorization gatekeepers
// const { protectAdmin } = require('../domains/middlewares/auth');

// 🔑 Public Access: Core Login System Endpoint
router.post('/auth/login', adminAuthController.loginAdmin);

// 🛡️ Protected Access: Registration requires an active Superadmin session token
router.post('/auth/register', adminAuthController.registerAdmin);
module.exports = router;