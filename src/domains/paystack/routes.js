const express = require("express");
const router = express.Router();
const {fundWallet,getAllBank,verifyPayment, withdrawFromWallet} = require("./controller");

router.post("/fund", async (req,res)=> {
    try{
        const response = await fundWallet(req.body);
        res.json({
            status:"SUCCESS",
            message: "Wallet funded" ,
            data:response
        })
    }
    catch(err){
        res.status(500).json({
            status:"FAILED",
            error:err.message
        })
    }
});
// verify payment
router.get("/verify/:ref", async (req,res)=> {
    try{
        const response = await verifyPayment(req.params.ref);
        res.json({
            status:"SUCCESS",
            message: "Wallet funded" ,
            data:response
        })
    }
    catch(err){
        res.status(500).json({
            status:"FAILED",
            error:err.message
        })
    }
});

router.post("/withdraw", async (req,res)=> {
    try{
        const response = await withdrawFromWallet(req.body);
        res.json({
            status:"SUCCESS",
            message: "Withdrawn successfully" ,
            data:response
        })
    }
    catch(err){
        res.status(500).json({
            status:"FAILED",
            error:err.message
        })
    }
});
router.get("/banks", async (req,res)=> {
    try{
        const response = await getAllBank();
        res.json({
            status:"SUCCESS",
            message: "availble flutter wave banks" ,
            data:response
        })
    }
    catch(err){
        res.status(500).json({
            status:"FAILED",
            error:err.message
        })
    }
});
module.exports = router;
