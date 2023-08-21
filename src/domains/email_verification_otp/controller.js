const UserOTPVerification = require("./model");
const User = require("../user/model")

const generateOTP = require("../../util/generateOTP");
const hashData = require("../../util/hashData");
const sendMail = require("../../util/sendMail");
const comparedHashedData = require("../../util/compareHashedData");



const sendOTPVerificationEmail = async ({ _id, email }) => {
try{
        
    const otp = await generateOTP();
    // mail options
    const mailoptions = {
    from: process.env.AUTH_EMAIL,
    to: email,
    subject: "Verify Your Email",
    html:`<p>Enter <b>${otp}</b> in the app to verify your email address
    <p>This code <b>expires in 10 minutes</b>.</p>`
    };

    const hashedOTP = await hashData(otp);

    const newOTPVerification = await new UserOTPVerification({
    userId:_id,
    otp:hashedOTP,
    createdAt: Date.now(),
    expiresAt: Date.now() + 600000,
    });
    
    // save otp record
    await newOTPVerification.save();
    await  sendMail(mailoptions);
    return {
        userId:_id,
        email
    }
}
catch(err){
    throw err;
}
}

const verifyEmailOTP = async ({otp, userId}) =>{
    try{
       // checking if opt exist
    const existingUser = await UserOTPVerification.findOne({userId});
    if(existingUser){
        const hashedPass = existingUser.otp;
        const comparedOtp = await comparedHashedData(otp,hashedPass);
        if(comparedOtp === true) {
            // verified success
            const user = User.findOne({_id:userId});
            user.emailerification = true;
            await  UserOTPVerification.deleteMany({_id:userId});
            return {
                emailerification: user.emailerification,
                userId: user._id,
                email:user.email
            }
        }
        // check expired otp
        else{
            throw new Error("Invalid otp code")
        }
    } 
    }
    catch(err){
        throw err;
    }
}

module.exports = {sendOTPVerificationEmail,verifyEmailOTP}