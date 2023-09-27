const express = require("express");
const {updateInterest, addInterest, createInterest, getAllInterest, getUserInterest,removeInterest } = require("./controller");
const router = express.Router();

//create new interest

router.post("/new", async (req, res) => {
    try {
    let { title } = req.body;
        if(!title) {
            throw Error("Empty fields not allowed");
    } else {
        // valid credentials
     const newInterest = await createInterest({
           title
        });

        res.json({
            status:"SUCCESS",
            message:"Interest created",
            data:newInterest
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
// add interest to user
router.post("/add", async (req, res) => {
    try {
    const { userId, interestId } = req.body;
        if(!userId || !interestId) {
            throw Error("Empty fields not allowed");
    } else {
        // valid credentials
     const userInterest = await addInterest(interestId,userId);

        res.json({
            status:"SUCCESS",
            message:"Interest added",
            data:userInterest
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
// remove interest to user
router.post("/remove", async (req, res) => {
    try {
    const { userId, interestId } = req.body;
        if(!userId || !interestId) {
            throw Error("Empty fields not allowed");
    } else {
        // valid credentials
     const userInterest = await removeInterest(interestId,userId);

        res.json({
            status:"SUCCESS",
            message:"Interest removed",
            data:userInterest
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
// get all interest
router.get("/all", async (req,res)=> {
    try{
        const allInterest= await getAllInterest();
        res.json({
            status:"SUCCESS",
            data:allInterest
            })

    }catch(err){
        res.status(500).json({
            status:"FAILED",
            error:err.message
        }) 
    }
    
})
// get interest by user
router.get("/user/:id", async (req,res)=> {
    console.log(req.params.id)
    try{
        const userInterest = await getUserInterest(req.params.id);
        res.json({
            status:"SUCCESS",
            data:userInterest
            })

    }catch(err){
        res.status(500).json({
            status:"FAILED",
            error:err.message
        }) 
    }
    
});

// update interest 
router.put("/update/:id", async (req, res) => {
    console.log(req.params.id)
    try {
         const updatedInterest = await updateInterest(req.params.id, req.body);

        res.json({
            status:"SUCCESS",
            message:"Interest updated",
            data:updatedInterest
        })

    }catch(err){
        res.status(500).json({
            status:"FAILED",
            message:err.message
        }) 
    }
});

module.exports = router;