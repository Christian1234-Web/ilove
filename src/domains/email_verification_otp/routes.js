const express = require("express");
const router = express.Router();
const {
  sendOTPVerificationEmail,
  verifyEmailOTP,
  verifyTransactionOTP,
} = require("./controller");
const generateOTP = require("../../util/generateOTP");

router.post("/resend-otp", async (req, res) => {
  const { userId, email } = data;
  const otp = await generateOTP();
  const subject = "Verify Your Email";
  const text = `<p>
  Enter <b>${otp}</b> in the app to verify your email address
    <p>This code <b>expires in 10 minutes</b>.</p>`;

  try {
    const emailOtp = await sendOTPVerificationEmail({
      userId,
      email,
      subject,
      text,
    });
    res.json({
      status: "SUCCESS",
      message: " Mail sent",
      data: emailOtp,
    });
  } catch (err) {
    res.status(400).json({
      status: "FAILED",
      message: err.message,
    });
  }
});

router.post("/verify-otp", async (req, res) => {
  try {
    const { otp } = req.body;
    if (!otp) {
      throw Error("Empty otp not allowed");
    }
    const emailOtp = await verifyEmailOTP(req.body);
    res.json({
      status: "SUCCESS",
      message: "Email Verified",
      data: emailOtp,
    });
  } catch (err) {
    res.status(400).json({
      status: "FAILED",
      message: err.message,
    });
  }
});
router.post("/transaction/verify-otp", async (req, res) => {
  try {
    const { otp } = req.body;
    if (!otp) {
      throw Error("Empty otp not allowed");
    }
    const emailOtp = await verifyTransactionOTP(req.body);
    res.json({
      status: "SUCCESS",
      message: "Email Verified",
      data: emailOtp,
    });
  } catch (err) {
    res.status(400).json({
      status: "FAILED",
      message: err.message,
    });
  }
});

module.exports = router;
