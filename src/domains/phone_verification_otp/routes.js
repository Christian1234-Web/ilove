const express = require("express");
const router = express.Router();
const { sendPhoneSmsOTP, verifySmsOTP } = require("./controller");

router.post("/send-otp", async (req, res) => {
  try {
    const { userId } = req.body;
    if (!userId) {
      throw Error("Empty inputs fields");
    }
    const smsOtp = await sendPhoneSmsOTP(req.body);
    res.json({
      status: "SUCCESS",
      message: "SMS Code sent",
      data: smsOtp,
    });
  } catch (err) {
    res.status(400).json({
      status: "FAILED",
      error: err.message,
    });
  }
});
router.post("/resend-otp", async (req, res) => {
  try {
    const { userId } = req.body;
    if (!userId) {
      throw Error("Empty inputs fields");
    }
    const smsOtp = await sendPhoneSmsOTP(req.body);
    res.json({
      status: "SUCCESS",
      message: " SMS Code sent",
      data: smsOtp,
    });
  } catch (err) {
    res.status(400).json({
      status: "FAILED",
      error: err.message,
    });
  }
});

router.post("/verify-otp", async (req, res) => {
  try {
    const { otp, userId } = req.body;
    if (!otp || !userId) {
      throw Error("Empty inputs fields");
    }
    const emailOtp = await verifySmsOTP(req.body);
    res.json({
      status: "SUCCESS",
      message: "Phone Number Verified",
      data: emailOtp,
    });
  } catch (err) {
    res.status(400).json({
      status: "FAILED",
      error: err.message,
    });
  }
});

module.exports = router;
