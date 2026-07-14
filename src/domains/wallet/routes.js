const express = require("express");
const router = express.Router();
const {
  createWallet,
  getAllWallet,
  getUserWallet,
  fundWalletByWallet,
} = require("./controller");

router.post("/new", async (req, res) => {
  try {
    const { userId } = req.body;
    const response = await createWallet(userId);
    res.json({
      status: "SUCCESS",
      message: "Wallet  created",
      data: response,
    });
  } catch (err) {
    res.status(400).json({
      status: "FAILED",
      message: err.message,
    });
  }
});
// fund wallet by wallet balance
router.post("/credit-another-user-wallet", async (req, res) => {
  try {
    const response = await fundWalletByWallet(req.body);
    res.json({
      status: "SUCCESS",
      message: "Transaction successful and awaiting approval from both users",
      data: response,
    });
  } catch (err) {
    res.status(400).json({
      status: "FAILED",
      message: err.message,
    });
  }
});
router.get("/user/:id", async (req, res) => {
  try {
    const response = await getUserWallet(req.params.id);
    res.json({
      status: "SUCCESS",
      data: response,
    });
  } catch (err) {
    res.status(400).json({
      status: "FAILED",
      message: err.message,
    });
  }
});
router.get("/all", async (req, res) => {
  try {
    const response = await getAllWallet();
    res.json({
      status: "SUCCESS",
      data: response,
    });
  } catch (err) {
    res.status(400).json({
      status: "FAILED",
      message: err.message,
    });
  }
});
const walletController = require('../controllers/wallet.controller');
const { protectAdmin } = require('../middlewares/auth');

// Audit list of all user wallets
router.get('/all', protectAdmin, walletController.getAllWallets);

// Direct credit/debit adjustment
router.post('/adjust', protectAdmin, walletController.adjustWalletBalance);

// Freeze or unlock a wallet
router.put('/freeze/:id', protectAdmin, walletController.toggleWalletFreeze);

module.exports = router;
