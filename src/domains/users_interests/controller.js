const User = require("../user/model");
const UsersInterest = require("./model");

// create a new interest

const createInterest = async (data) =>{
    try{
        const { title} = data;
            // Try to create new user
            const userInterest = new UsersInterest({
                title
            });
            // save user interest
            const createdUserInterest = await userInterest.save();
            return createdUserInterest;
        
    }catch(err){
        throw err;
    }
}
// remove interest from user
const removeInterest = async (interestId,userId) =>{
    try{
        // remove interest from user
        const user = await User.findOne({_id:userId});
        const userInterestIndex = user.interest.findIndex(e => e._id.toString() === interestId);
        if(userInterestIndex !== -1){
            await user.interest.splice(userInterestIndex,1);
            await user.save();
        }
        
        return user;
    
}catch(err){
    throw err;
}
}
const addInterest = async (interestId,userId) =>{
    try{
            // add interest to user
            const interest = await UsersInterest.findOne({_id:interestId});
            const user = await User.findOne({_id:userId});
            const userInterests = user.interest.find(e => e._id.toString() === interestId);
            if(userInterests){
                throw Error("User has already added this interest");
            }
            await user.interest.push(interest);
            await user.save();
            return user;
        
    }catch(err){
        throw err;
    }
}
// update interets
const updateInterest = async (interestId, data) => {
    try{       
            // updated interest
            const updatedInterest = await UsersInterest.updateOne({_id: interestId }, data);
            return updatedInterest;
        
    }catch(err){
        throw err;
    }
}

// get all  interests
const getAllInterest = async () =>{
    try{
        const allInterst = await UsersInterest.find();
        return allInterst;
    }catch(err){
        throw err;
    }
} 
// get single user interets 
const getUserInterest = async (userId) =>{
    console.log(userId)
    try{
        const userIntersts = await UsersInterest.find({user:userId})
        console.log(userIntersts)
        return userIntersts;
    }catch(err){
        throw err;
    }
}

module.exports = {getUserInterest,removeInterest, getAllInterest,updateInterest,createInterest,addInterest}