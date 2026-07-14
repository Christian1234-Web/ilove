const express = require('express');
const router = express.Router();
const transactionController = require('../domains/controllers/transaction.controller');
const { protectAdmin } = require('../domains/middlewares/auth');

// 1. GET /admin/transaction/ledger — Get full financial logs

router.get('/ledger', protectAdmin, transactionController.getLedger);
// Settle or decline P2P requests[cite: 1]

router.post('/p2p/override', protectAdmin, transactionController.overrideP2PTransfer); //[cite: 1]
// Settle or decline Paystack bank withdrawal requests[cite: 1]

router.post('/withdrawal/settle', protectAdmin, transactionController.settleWithdrawal); //[cite: 1]


module.exports = router;