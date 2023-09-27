const express = require("express");
const router = express.Router();
const {createWallet, getAllWallet,getUserWallet} = require("./controller");

router.post("/new", async (req,res)=> {
    try{
        const {userId} = req.body;
        const response = await createWallet(userId);
        res.json({
            status:"SUCCESS",
            message: "Wallet  created",
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

router.get("/user/:id", async (req,res)=> {
    try{
        const response = await getUserWallet(req.params.id);
        res.json({
            status:"SUCCESS",
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
router.get("/all", async (req,res)=> {
    try{
        const response = await getAllWallet();
        res.json({
            status:"SUCCESS",
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
