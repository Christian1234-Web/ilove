
const express = require("express");
const router = express.Router();

const userRoutes = require("../domains/user");
const phoneRoutes = require("../domains/phone_verification_otp");
const emailRoutes = require("../domains/email_verification_otp");
const kycRoutes = require("../domains/kyc_verification");
const interestRoutes = require("../domains/users_interests");
const walletRoutes = require("../domains/wallet");
const flutterwaveRoutes = require("../domains/flutterwave");
const paystackRoutes = require("../domains/paystack");
const walletTransactionRoutes = require("../domains/wallet_transaction");
const transactionRoutes = require("../domains/transaction");
const ImageRoutes = require("../domains/upload_image");
const chatRoutes = require("../domains/chat");


router.use("/user", userRoutes);
router.use("/phone", phoneRoutes);
router.use("/email", emailRoutes);
router.use("/kyc", kycRoutes);
router.use("/wallet", walletRoutes);
router.use("/flutterwave", flutterwaveRoutes);
router.use("/paystack", paystackRoutes);
router.use("/wallet-transaction", walletTransactionRoutes);
router.use("/transaction", transactionRoutes); 
router.use("/interest", interestRoutes);
router.use("/upload", ImageRoutes);
router.use("/chat", chatRoutes);







module.exports = router;
 