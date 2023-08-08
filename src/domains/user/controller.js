const hashData = require("../../util/hashData");
const User = require("./model");

// signup // create a new user

const createNewUser = async (data) =>{
    try{
        const { username, email, password, address ,phone} = data;
        // Checking if user already exists
        const existingUser = await User.findOne({ email })
        if (existingUser) {
        // A user already exists
        throw Error("User with the provided email already exists");
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

// get all user

const getAllUser = async () =>{
    try{
        const users = await User.find(); 
        console.log(users);
        return users;
    }catch(err){
        throw err;
    }
}

module.exports = {createNewUser,getAllUser}