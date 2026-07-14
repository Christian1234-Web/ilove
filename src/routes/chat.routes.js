const express = require('express');
const router = express.Router();
const chatController = require('../domains/controllers/chart.controller');
const { protectAdmin } = require('../domains/middlewares/auth');

// 1. GET /admin/chat/flagged — Fetch list of reported text channels
// Note: If you want to use the same logic, ensure getFlaggedChats is implemented in your controller
router.get('/flagged', protectAdmin, chatController.getFlaggedChats);

// 2. GET /admin/chat/transcript/:chatId — Fetch chat log transcripts
router.get('/transcript/:chatId', protectAdmin, chatController.getChatTranscript); //[cite: 1]

// 3. POST /admin/chat/warn — Inject system notification bubble into chat room[cite: 1]
router.post('/warn', protectAdmin, chatController.injectChatWarning); //[cite: 1]

module.exports = router;