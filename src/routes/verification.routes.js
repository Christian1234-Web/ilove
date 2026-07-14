const express = require('express');
const router = express.Router();
const verificationController = require('../domains/controllers/verificationRequest.controller');
const { protectAdmin } = require('../domains/middlewares/auth');

// GET /admin/verification/pending[cite: 1]
router.get('/pending', protectAdmin, verificationController.getPendingVerifications); //[cite: 1]

// POST /admin/verification/review[cite: 1]
router.post('/review', protectAdmin, verificationController.reviewVerificationRequest); //[cite: 1]

// 📤 User Action: Submit a verification request
router.post('/create', verificationController.createVerificationRequest);
module.exports = router;