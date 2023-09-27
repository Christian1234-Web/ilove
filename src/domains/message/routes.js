const express = require("express");
const { createMessage, getMessages, deleteMessages } = require("./controller");
const router = express.Router();

router.post("/new", async (req,res) => {
    try{
        const response = await createMessage(req.body);

        res.json({
            status:"SUCCESS",
            message:response
        })
    }catch(err){
        res.status(500).json({
            status:"FAILED",
            message:err.message
        })
    }
});

router.get("/chat/:chatId", async (req,res) => {
    try{
        const response = await getMessages(req.params.chatId);

        res.json({
            status:"SUCCESS",
            message:response
        })
    }catch(err){
        res.json({
            status:"FAILED",
            messages:err.message
        })
    }
});
router.delete("/delete", async (req,res) => {
    try{
        const response = await deleteMessages();

        res.json({
            status:"SUCCESS",
            message:response
        })
    }catch(err){
        res.status(500).json({
            status:"FAILED",
            message:err.message
        })
    }
});

module.exports = router;