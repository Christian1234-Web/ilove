const Message = require("./model");

//create message

const createMessage = async (data) => {
    try{
        const {chatId,senderId,receiverId, message} = data;
        const incomingMessage = new Message({
            chatId,
            senderId,
            receiverId,
            message
        });
        const response = await incomingMessage.save();
        return response;
    }catch(err){
        throw err;
    }
} 

// get messages
const getMessages = async (chatId) => {
    try{
        const messages = await Message.find({chatId}).populate('senderId').populate('receiverId') 
        return messages;
    }catch(err){
        throw err;
    }

}
// get messages
const deleteMessages = async (chatId) => {
    try{
        const messages = await Message.deleteMany() 
        return messages;
    }catch(err){
        throw err;
    }

}

module.exports = {createMessage, getMessages,deleteMessages};