const express = require("express");
const {  sendRequest, findUserSendRquest, acceptRequest, rejectRequest, deleteAllRequest, findUserRecieveRquest } = require("./controller");
const router = express.Router();

// send request
router.post("/send", async (req,res) => {
    try{
        const response = await sendRequest(req.body);

        res.json({
            status:"SUCCESS",
            message:"Friend request sent",
            data:response
        })
    }catch(err){
        res.status(500).json({
            status:"FAILED",
            message:err.message
        })
    }
});

// get user sent request
router.get("/sent/:userId", async (req,res) => {
    try{
        const response = await findUserSendRquest(req.params.userId);

        res.json({
            status:"SUCCESS",
            data:response
        })
    }catch(err){
        res.status(500).json({
            status:"FAILED",
            message:err.message
        })
    }
});
// get user recieve request
router.get("/receive/:userId", async (req,res) => {
    try{
        const response = await findUserRecieveRquest(req.params.userId);

        res.json({
            status:"SUCCESS",
            data:response
        })
    }catch(err){
        res.status(500).json({
            status:"FAILED",
            message:err.message
        })
    }
});
// accept request
router.post("/accept", async (req,res) => {
    try{
        const response = await acceptRequest(req.body);

        res.json({
            status:"SUCCESS",
            message:"Friend request accepted and chat created",
            data:response
        })
    }catch(err){
        res.status(500).json({
            status:"FAILED",
            message:err.message
        })
    }
});
// reject request
router.post("/reject", async (req,res) => {
    try{
        const response = await rejectRequest(req.body);

        res.json({
            status:"SUCCESS",
            message:"Friend request rejected",
            data:response
        })
    }catch(err){
        res.status(500).json({
            status:"FAILED",
            message:err.message
        })
    }
});

// delete all request
router.delete("/delete", async (req,res) => {
    try{
        const rs = await deleteAllRequest(req.body);
        res.json({
            message:rs
        })
    }catch(err){
        res.json({
            message:err
        })
    }
})

module.exports = router;