const UserOTPVerification = require("../email_verification_otp/model")
const hashData = require("../../util/hashData");
const User = require("../user/model");
const accountSid = process.env.TWILIO_ACCOUNT_SID
// "AC2c29cbfba4d57a98b3ed713ead93584c";
const authToken = process.env.TWILIO_AUTH_TOKEN;
const verifySid = process.env.TWILIO_SERVICE_SID;
// "VA905e050a998fcb8cdf6894aed37b26f2";
const client = require("twilio")(accountSid, authToken);

const sendPhoneSmsOTP = async ({ userId, countryCode = 234}) =>{

    try{
        const user = await User.findOne({_id:userId});
        if(!user){
            throw Error("User not found");
        }
        const optRes = await client.verify.v2
        .services(verifySid)
        .verifications
        .create({ 
            to: `+${countryCode}${user.phone}`,
             channel: "sms" 
            })
        
        return optRes;
    }catch(err){
        console.log(err);
        throw err;
    }
}

const verifySmsOTP = async ({otp, userId, countryCode = 234}) => {
    try{
        const user = await User.findOne({_id:userId});
        if(!user){
            throw Error("User not found");
        }
        const verifyRes = await client.verify
        .v2.services(verifySid)
            .verificationChecks.create({
                to: `+${countryCode}${user.phone} `,
                code:otp,
            });
            if(verifyRes?.valid === false){ 
                throw Error("Invalid otp code");
            }
            return {
                phone:verifyRes.to,
                valid:verifyRes.valid,
                status:verifyRes.status,
                dateUpdated:verifyRes.dateUpdated
            }
    }catch(err){
        throw err;
    }
}


module.exports = {sendPhoneSmsOTP,verifySmsOTP }