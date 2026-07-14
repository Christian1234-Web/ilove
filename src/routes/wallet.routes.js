const express = require('express');
const router = express.Router();
const walletController = require('../domains/controllers/wallet.controller');
const { protectAdmin } = require('../domains/middlewares/auth');

// Audit list of all user wallets
router.get('/all', protectAdmin, walletController.getAllWallets);

// Direct credit/debit adjustment
router.post('/adjust', protectAdmin, walletController.adjustWalletBalance);

// Freeze or unlock a wallet
router.put('/freeze/:id', protectAdmin, walletController.toggleWalletFreeze);

module.exports = router;