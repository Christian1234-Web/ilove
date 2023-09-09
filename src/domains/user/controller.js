const User = require("./model");
const comparedHashedData = require("../../util/compareHashedData");
const sendMail = require("../../util/sendMail");
const hashData = require("../../util/hashData");
const jwt = require("jsonwebtoken");
const generateOTP = require("../../util/generateOTP");
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

const loginUser = async ({username,password}) =>  {
   
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
            const tokenPayload = {
                email: user.email,
              };
              const accessToken = jwt.sign(tokenPayload, 'SECRET');
            user.active = true
            return {
                user,
                accessToken
            };
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
        const mailoptions = {
            from: process.env.AUTH_EMAIL,
            to: email,
            subject: "Forget Password Verification",
            html:`<p>Enter <b>${otp}</b> in the app to continue with fhe recovery password process
            <p>This code <b>expires in 10 minutes</b>.</p>`
            };
        await sendMail(mailoptions);
        return {
            username: existingUser.username,
            userId:existingUser_id
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
    const {username, firstname, lastname} = data;
    try{
        const users = await User.find({username}); 
        return users;
    }catch(err){
        throw err;
    }
}

module.exports = {createNewUser,updatePassword,getAllUser,loginUser,forgetPassword,findUser,logoutUser,updateUser,getSingleUser,deleteUser}