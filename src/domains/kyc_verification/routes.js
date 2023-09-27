const express = require("express");
const {  createNewKYCVerification, getAllKycVerification, getSingleKycVerification } = require("./controller");
const router = express.Router();
//signup

router.post("/upload", async (req, res) => {
    try {
    let { userId, image } = req.body;
        if(!userId || !image) {
            throw Error("Empty fields not alloed")
    } else {
        // valid credentials
     const newUserKYC =    await createNewKYCVerification({
           userId,
           image
        });

        res.status(500).json({
            status:"PENDING",
            message:"ID Uploaded",
            data:newUserKYC
        })

    }
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
        const allKYC = await getAllKycVerification();
        res.json({
            status:"SUCCESS",
            data:allKYC
            })

    }catch(err){
        res.status(500).json({
            status:"FAILED",
            error:err.message
        }) 
    }
    
})
router.get("/user/:id", async (req,res)=> {
    try{
        const allKYC = await getSingleKycVerification(req.params.id);
        res.json({
            status:"SUCCESS",
            data:allKYC
            })

    }catch(err){
        res.status(500).json({
            status:"FAILED",
            error:err.message
        }) 
    }
    
})

module.exports = router;