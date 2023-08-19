const kYCVerification = require("./model");

// signup // create a new user

const createNewKYCVerification = async (data) =>{
    try{
        const { image,userId} = data;
        // Checking if user already exists
        const existingKYC = await kYCVerification.findOne({userId })
        if (existingKYC) {
        // A user already exists
        throw Error("User already done kyc verification");
        }
         else {
        // Try to create new user
            const newUserKYC = new kYCVerification({
                user:userId,
                image
            });
            // save user
            const createdNewUserKYC = await newUserKYC.save();
            return createdNewUserKYC;
            
         }
        
    }catch(err){
        throw err;
    }
}

const updateKYCVerification = async () => {
    try{
        const { image,userId} = data;
       
        // Try to update new user
            const newUserKYC = new kYCVerification({
                user:userId,
                image
            });
            // save user
            const createdNewUserKYC = await newUserKYC.updateOne();
            return createdNewUserKYC;
        
    }catch(err){
        throw err;
    }
}

// get all user kyc
const getAllKycVerification = async () =>{
    try{
        const usersKYC = await kYCVerification.find().populate("user"); 
        return usersKYC;
    }catch(err){
        throw err;
    }
} 
// get single user kyc 
const getSingleKycVerification = async (userId) =>{
    try{
        const userKYC = await kYCVerification.findOne({user:userId}).populate("user")
        return userKYC;
    }catch(err){
        throw err;
    }
}

module.exports = {createNewKYCVerification, updateKYCVerification,getSingleKycVerification,getAllKycVerification}