const express = require("express");
const { createMessage, getMessages } = require("./controller");
const router = express.Router();

router.post("/new", async (req,res) => {
    try{
        const response = await createMessage(req.body);

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


module.exports = router;