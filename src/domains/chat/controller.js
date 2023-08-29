const Chat = require("./model")


//create chat
const  createChat = async ({firstId,secondId}) => {
    try{

        const chat = await Chat.findOne({
            members: {$all: [firstId,secondId]}
        });

        if(chat) return {chat};

        const newChat  = new Chat({
            members: [firstId,secondId]
        })
        
        const response = await newChat.save();

        return {response}
    }catch(err){
        throw err
    }
}
//get user chat
const findUserChats = async (userId) => {
    try{
        const chat = await Chat.find({
            members:{$in: [userId]}
        });
        return {chat}
    }catch(err){
        throw err;
    }
}
//find chat
const findChat = async (firstId,secondId) => {
    try{
        const chat = await Chat.findOne({
            members: {$all: [firstId,secondId]}
        });
        return {chat}
    }catch(err){
        throw err;
    }
}

module.exports = {findChat, findUserChats, createChat};

