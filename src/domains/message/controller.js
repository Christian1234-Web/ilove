const Message = require("./model");

//create message

const createMessage = async (data) => {
    try{
        const {chatId,senderId, message} = data;
        const incomingMessage = new Message({
            chatId,
            senderId,
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
        const messages = await Message.find({chatId});
         
        return messages;
    }catch(err){
        throw err;
    }

}

module.exports = {createMessage, getMessages};