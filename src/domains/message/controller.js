const Message = require("./model");

//create message

const createMessage = async (data) => {
    try{
        console.log(data);
        const {chatId,senderId,recipientId, message} = data;
        if(!chatId || !senderId || !recipientId || message){
           return  
        }
        const incomingMessage = new Message({
            chatId,
            senderId,
            recipientId,
            message
        });
        const response = await incomingMessage.save();
        console.log(response)
        return response;
    }catch(err){
        throw err;
    }
} 

// get messages
const getMessages = async (chatId) => {
    try{
        const messages = await Message.find({chatId})
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