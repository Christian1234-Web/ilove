const express = require("express");
const router = express.Router();
const  {sendPhoneSmsOTP, verifySmsOTP} = require("./controller");

router.post("/send-otp", async (req,res)=> {

    try{
    const {phone} = req.body;
        if(!phone){
            throw  Error("Empty inputs fields")
        }
        const smsOtp = await sendPhoneSmsOTP(req.body);
        res.json({
            satus:"SUCCESS",
            message: " SMS Code sent",
            data:smsOtp
        })
    }
    catch(err){
        res.json({
            status:"FAILED",
            error:err.message
        })
    }
});
router.post("/resend-otp", async (req,res)=> {
   
    try{
        const {phone} = req.body;
        if(!phone){
            throw  Error("Empty inputs fields")
        }
        const smsOtp = await sendPhoneSmsOTP(req.body);
        res.json({
            satus:"SUCCESS",
            message: " SMS Code sent",
            data:smsOtp
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
        const {otp,phone} = req.body;
        if(!otp|| !phone){
            throw  Error("Empty inputs fields")
        }
        const emailOtp = await verifySmsOTP(req.body);
        res.json({
            satus:"SUCCESS",
            message: "Phone Number Verified",
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