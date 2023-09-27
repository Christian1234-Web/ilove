const express = require("express");
const router = express.Router();
const {getSingleTransaction, getAllTransaction } = require("./controller")

router.get("/single/:transactionId", async (req,res)=> {
    try{
        const response = await getSingleTransaction(req.params.transactionId);
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
        const response = await getAllTransaction();
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
