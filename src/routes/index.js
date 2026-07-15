
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
const messageRoutes = require("../domains/message");
const friendRequestRoutes = require("../domains/friend_request");
const reportRoutes = require("../domains/report");

// const auth = require("../domains/middlewares/auth");

// const admin = require("../middleware/admin");

// router.use(auth);

// router.use(admin);

//admin
router.use('/admin/wallet', require('./wallet.routes'));
router.use('/admin/dashboard', require('./dashboard.routes'));
router.use('/admin/chat', require('./chat.routes'));
router.use('/admin/transaction', require('./transaction.routes'));
router.use('/admin/verification', require('./verification.routes'));
router.use('/admin/transaction', require('./transaction.routes'));
router.use('/admin/user', require('./user.routes'));
router.use('/admin/moderation', require('./moderation.routes'));
router.use('/admin/safety', require('./safety.routes'));

router.use('/admin', require('./config.routes'));
router.use('/admin', require('./settings.routes'));
router.use('/admin', require('./adminAuth.routes'));






//end
router.use("/user", userRoutes);
router.use("/report", reportRoutes);
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
router.use("/message", messageRoutes);
router.use("/friend-request", friendRequestRoutes);




module.exports = router; 