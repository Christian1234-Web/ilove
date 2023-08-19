const express = require("express");
const router = express.Router();
import {sendOTPVerificationEmail,verifyEmailOTP} from "./controller"

router.post("/resend-otp", async (req,res)=> {
    try{
        const emailOtp = await sendOTPVerificationEmail(req.body);
        res.json({
            status:"SUCCESS",
            message: " Mail sent",
            data:emailOtp
        })
    }
    catch(err){
        res.json({
            status:"FAILED",
            error:err.message
        })
    }
});

router.post("/verify-otp", async (req,res)=> {
    try{
        const emailOtp = await verifyEmailOTP(req.body);
        res.json({
            status:"SUCCESS",
            message: "Email Verified",
            data:emailOtp
        })
    }
    catch(err){
        res.json({
            status:"FAILED",
            error:err.message
        })
    }
});

module.exports = router;
