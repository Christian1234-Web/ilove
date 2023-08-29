const express = require("express");
const { createChat, findUserChats, findChat } = require("./controller");
const router = express.Router();

router.post("/new", async (req,res) => {
    try{
        const response = await createChat(req.body);

        res.json({
            status:"SUCCESS",
            message:response
        })
    }catch(err){
        res.json({
            status:"FAILED",
            message:err.message
        })
    }
});

router.get("/user/:userId", async (req,res) => {
    try{
        const response = await findUserChats(req.params.userId);

        res.json({
            status:"SUCCESS",
            message:response
        })
    }catch(err){
        res.json({
            status:"FAILED",
            message:err.message
        })
    }
});
router.get("/find/:firstId/:secondId", async (req,res) => {
    try{
        const response = await findChat(req.params.firstId, req.params.secondId);

        res.json({
            status:"SUCCESS",
            message:response
        })
    }catch(err){
        res.json({
            status:"FAILED",
            message:err.message
        })
    }
});

module.exports = router;