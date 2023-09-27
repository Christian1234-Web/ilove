const express = require('express');
const router = express.Router();
const { uploadProfileImage, uploadCoverImage, getAllProfilePics, getAllCoverPics, deleteAllProfilePics } = require('./controller');

router.post("/profile/:id", async (req,res)=> {
    try{
        const userId = req.params.id;
        const {image} = req.body;
        // const file = req.files?.image;
        if(!userId){
            throw Error("Empty input not allowed");
        }
        if(!image){
            throw Error("Kindly add a image url");
        }
        const response = await uploadProfileImage(userId,image);
        res.json({
            status:"SUCCESS",
            message:"Profile Image uploaded",
            data:response
        })
    }catch(err){
        res.json({
            status:'FAILED',
            error:err.message
        })
    }
});
router.post("/cover/:id", async (req,res)=> {
    try{
        const userId = req.params.id;
        const {image} = req.body;

        // const file = req.files?.image;
        if(!userId){
            throw Error("Empty input not allowed");
        }
        if(!image){
            throw Error("Kindly add a image url");
        }
        const response = await uploadCoverImage(userId,image);
        res.json({
            status:"SUCCESS",
            message:"Cover Image uploaded",
            data:response
        })
    }catch(err){
        res.json({
            status:'FAILED',
            error:err.message
        })
    }
});
router.get("/profile/all", async (req,res)=> {
    try{
        const response = await getAllProfilePics();
        res.json({
            status:"SUCCESS",
            message:"Profile Images obtained",
            data:response
        })
    }catch(err){
        res.json({
            status:'FAILED',
            error:err.message
        })
    }
});
router.get("/cover/all", async (req,res)=> {
    try{
        const response = await getAllCoverPics();
        res.json({
            status:"SUCCESS",
            message:"Cover Images obtained",
            data:response
        })
    }catch(err){
        res.json({
            status:'FAILED',
            error:err.message
        })
    }
});
router.delete("/profile/delete/all", async (req,res)=>{
    try{
        const response = await deleteAllProfilePics(); 
        res.json({
            status:"SUCCESS",
            message:"All profile pics deleted"
        })
    }catch(err){
        res.status(500).json({
            status:"FAILED",
            message:err.message
        })
    }
})
module.exports = router;
 