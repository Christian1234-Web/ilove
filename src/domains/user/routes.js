const express = require("express");
const { createNewUser, getAllUser } = require("./controller");
const router = express.Router();
// const {sendOTPVerificationEmail} = require ("../email_verification_otp/controller");

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
        // const emailData = await sendOTPVerificationEmail(newUser);

        res.json({
            satus:"PENDING",
            message:"Verification email sent",
            // data:emailData
        })

    }
}
    catch(err){
        res.json({
            satus:"FAILED",
            error:err.message
        }) 
    }
});

router.get("/users", async (req,res)=> {
    try{
        const allusers = await getAllUser();
        // const emailData = await sendOTPVerificationEmail({_id:'112121',email:"ebukaugwulast@gmail.com"});
        res.json({
            satus:"SUCCESS",
            data:allusers
                })

    }catch(err){
        res.json({
            satus:"FAILED",
            error:err.message
        }) 
    }
    
})

module.exports = router;