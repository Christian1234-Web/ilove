const express = require('express');
const router = express.Router();
const { uploadProfileImage, uploadCoverImage, getAllProfilePics, getAllCoverPics, deleteAllProfilePics } = require('./controller');

router.post("/profile/:id", async (req,res)=> {
    try{
        const userId = req.params.id;
        const file = req.files?.image;
        if(!userId){
            throw Error("Empty input not allowed");
        }
        console.log(req.files);
        if(!file){
            throw Error("Kindly upload a image");
        }
        const response = await uploadProfileImage(userId,file);
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
        const file = req.files?.image;
        if(!userId){
            throw Error("Empty input not allowed");
        }
        if(!file){
            throw Error("Kindly upload a image");
        }
        const response = await uploadCoverImage(userId,file);
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
        res.json({
            status:"FAILED",
            message:err.message
        })
    }
})
module.exports = router;
 