const User = require("./model");
const UserOTPVerification = require("../email_verification_otp/model");

const comparedHashedData = require("../../util/compareHashedData");
const sendMail = require("../../util/sendMail");
const hashData = require("../../util/hashData");
const jwt = require("jsonwebtoken");
const generateOTP = require("../../util/generateOTP");
const { sendOTPVerificationEmail } = require("../email_verification_otp/controller");
// signup // create a new user
const createNewUser = async (data) => {
    try{
        const { username, email, password, address ,phone} = data;
        
        // Checking if user already exists
        const existingUser = await User.findOne({ email });
        const existingUserPhone = await User.findOne({ phone })

        if (existingUser) {
        // A user already exists
        throw Error("User with the provided email already exists");
        }
        if (existingUserPhone) {
        // A user already exists
        throw Error("User with the provided phone number already exists");
        }
         else {
            // hash password
            const hashedPassword = await hashData(password);
             // Try to create new user
            const newUser = new User({
                username,
                email,
                phone,
                address,
                password:hashedPassword
            });
            // save user
            const createdUser = await newUser.save();
            return createdUser; 
            
         }
        
    }catch(err){
        throw err;
    }
}

const loginUser = async ({username,password},res) =>  {
   
    try{
        if(!username || !password){
            throw Error("Empty fields not allowed");
        }
        const user = await User.findOne({username}); 
        if(!user){
            throw Error("User does not exist");
        }
        const comparedHashedPass = await comparedHashedData(password,user.password);
        if(comparedHashedPass === true){
            if(user.emailVerification !== true){
                 await sendOTPVerificationEmail({userId:user._id,email:user.email});
                
                  return (res.json({
                    status:"PENDING",
                    message: "Email must be verified, Verification code sent to email address",
                    data:{user, accessToken:null}
                  })); 
            }
            const tokenPayload = {
                email: user.email,
              };
              const accessToken = jwt.sign(tokenPayload, 'SECRET'); 
                user.active = true
            
            const response =  {
                user,
                accessToken
            };
            res.json({
                status:"SUCCESS",
                message: "Sigin successful",
                data:response
               });
        }else{
            throw Error("Invalid Credentials")
        }
    }catch(err){
        throw err;
    }
}

// logout user
const logoutUser = async ({userId}) =>  {
   
    try{
       
        const user = await User.findOne({_id:userId}); 
        if(!user){
            throw Error("User does not exist");
        }
            user.active = false
            return user;
    }catch(err){
        throw err;
    }
}
// get all user

// update user 
const updateUser = async (userId,data) =>{
    try{
        const user = await User.updateOne({ _id: userId }, data);

        return user
    }catch(err){
        throw err;
    }
}
const getSingleUser = async (_id) =>{
    try{
        const user = await User.findOne({_id}); 
        return user;
    }catch(err){
        throw err;
    }
}
const getAllUser = async () =>{
    try{
        const users = await User.find(); 
        return users;
    }catch(err){
        throw err;
    }
}
// user forget password
const forgetPassword = async ({email}) => {
    try{
        const existingUser = await User.findOne({email});
        if(!existingUser){
            throw Error("User does not exists")
        }
        const otp = await  generateOTP();
         const hashedOTP = await hashData(otp);
        const mailoptions = {
            from: process.env.AUTH_EMAIL,
            to: email,
            subject: "Forget Password Verification",
            html:`<p>Enter <b>${otp}</b> in the app to continue with fhe recovery password process
            <p>This code <b>expires in 10 minutes</b>.</p>`
            };
        const newOTPVerification = await new UserOTPVerification({
            userId:existingUser._id,
            otp:hashedOTP,
            createdAt: Date.now(),
            expiresAt: Date.now() + 600000,
            });
            
            // save otp record
            await newOTPVerification.save();
            await sendMail(mailoptions);
        return {
            username: existingUser.username,
            userId:existingUser._id
        };
    }catch(err){
        throw err;
    }
}
const updatePassword = async ({userId,password}) =>  {
   
    try{
        const user = await User.findOne({_id:userId}); 
        if(!user) {
            throw Error("User Account not found");
        }
        const hashPassword = await hashData(password);
        user.password = hashPassword;
        user.save();
        return {userId}
    }catch(err){
        throw err;
    }
}
const deleteUser = async (userId) => {
    try{
        const user = await User.deleteOne({_id:userId});
        return {
            user
        }
    }catch(err){
        throw err;
    }
} 
// find users by username or first name or lastname
const findUser = async (data) =>{
    const {username} = data;
    try{
        const users = await User.find({username}); 
        return users;
    }catch(err){
        throw err;
    }
}
// block a user
const blockUser = async (data) =>{
    const {userId, blockUserId} = data;
    try{
        const user = await User.findOne({_id:userId}); 
        const blockedUser = await user.blockedUsers.find(e => e === blockUserId);
        if(!blockedUser){
             user.blockedUsers.push(blockUserId);
            await user.save();
            return user;
        }else{
            throw Error("You have already blocked this user");
        }
    }catch(err){
        throw err;
    }
}
// un block a user
const unBlockUser = async (data) =>{
    const {userId, unblockUserId} = data;
    try{
        const user = await User.findOne({_id:userId}); 
        const blockedUser =  user.blockedUsers.indexOf(unblockUserId);
        if(blockedUser !== -1){
             user.blockedUsers.splice(blockedUser,1);
            await user.save();
            return user;
        }else{
            throw Error("You have already unblocked this user");
        }
    }catch(err){
        throw err;
    }
}

module.exports = {unBlockUser,blockUser,createNewUser,updatePassword,getAllUser,loginUser,forgetPassword,findUser,logoutUser,updateUser,getSingleUser,deleteUser}