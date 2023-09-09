const express = require("express");
const { createNewUser, getAllUser, deleteUser,loginUser,findUser,forgetPassword,updatePassword, updateUser,getSingleUser } = require("./controller");
const router = express.Router();
const {sendOTPVerificationEmail} = require("../email_verification_otp/controller");
const { createWallet } = require("../../domains/wallet/controller");
//signup

router.post("/signup", async (req, res) => {
    try {
    let { username, email, password, phone, addresss } = req.body;
    username = username.trim();
    email = email.trim();
    password = password.trim();

    if (username == "" || email == "") {
    throw Error("Empty input fields!");
    } else if (!/^[a-zA-Z ]*$/.test(username)) {
    throw Error("Invalid name entered");
    } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
    throw Error("Invalid email entered");
    } else if (password.length < 4) {
    throw Error("Password is too short!");
    } else {
        // valid credentials
     const newUser =    await createNewUser({
            username,
            email,
            password,
            phone,
            addresss
        });
        const wallet = await createWallet(newUser._id)
        const emailData = await sendOTPVerificationEmail(newUser);

        res.json({
            status:"PENDING",
            message:"Verification email sent",
            data:emailData
        })

    }
}
    catch(err){
        res.json({
            status:"FAILED",
            error:err.message
        }) 
    }
});
// signin
router.post("/signin", async (req,res) => {
    try{
       const response = await loginUser(req.body);
       
       res.json({
        status:"SUCCESS",
        message: "Sigin successful",
        data:response
       });
    }
    catch(err){
        res.json({
            status:"FAILED",
            message:err.message
        })
    }
})
// all user
router.get("/all", async (req,res)=> {
    try{
        const allusers = await getAllUser();
        // const emailData = await sendOTPVerificationEmail({_id:'112121',email:"ebukaugwulast@gmail.com"});
        res.json({
            status:"SUCCESS",
            data:allusers
                })

    }catch(err){
        res.json({
            status:"FAILED",
            error:err.message
        }) 
    }
    
});
// single user
router.get("/single/:id", async (req,res)=> {
    try{
        const response = await getSingleUser(req.params.id);
        res.json({
            status:"SUCCESS",
            data:response
                })

    }catch(err){
        res.json({
            status:"FAILED",
            error:err.message
        }) 
    }
    
});
// find user by username 
router.get("/find", async (req,res)=> {
    try{
        const response = await findUser({username:req.query.username});
        res.json({
            status:"SUCCESS",
            data:response
            })

    }catch(err){
        res.json({
            status:"FAILED",
            error:err.message
        }) 
    }
    
});
// forget password
router.post("/forget-password", async (req,res) => {
    try{
        const response = await forgetPassword(req.body);
        res.json({
            status:"SUCCESS",
            message:"Mail has been sent, check your email for otp",
            data:response
        })
    }catch(err){
        res.json({
            status:"FAILED",
            message:err.message
        })
    }

});
router.post("/update-password", async (req,res)=> {
    try{
        let {password} = req.body;
        password = password.trim();

        if(password.length < 4) {
            throw Error("Password is too short!");
        }
    const response = await updatePassword(req.body);
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
})
// update user
router.put("/update/:id", async (req,res)=> {
    try{
        const response = await updateUser(req.params.id,req.body);

        res.json({
            status:"SUCCESS",
            message:"User Updated",
            data:response
        })
    }catch(err){
        res.json({
            status:"FAILED",
            message:err.message
        })
    }
});
// delete user
router.delete("/delete/:id", async (req,res)=> {
    try{
        const response = await deleteUser(req.params.id);

        res.json({
            status:"SUCCESS",
            message:"User deleted",
            data:response
        })
    }catch(err){
        res.json({
            status:"FAILED",
            message:err.message
        })
    }
});


module.exports = router;