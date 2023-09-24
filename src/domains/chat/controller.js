const { getMessages } = require("../message/controller");
const Chat = require("./model")
// const {} 

//create chat
const  createChat = async (firstId,secondId) => {
    try{
        if(firstId === null || secondId === null) {
            throw Error("First and second id can not be empty");
        }
        if(firstId === "" || secondId === "") {
            throw Error("First and second id can not be empty");
        }
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
const recentMsg = (e) => {
    return e
}
// recent chat interaction
const findRecentChatInteraction = async (userId) => {
    try{
        const chat = await Chat.find({
            members:{$in: [userId]}
        });
        const recentChat = [];

        const processChat = async (chatId) => {
            const messages = await getMessages(chatId);
            const latestMsg = messages[messages.length - 1];
            return latestMsg;
          };
        const processChats = async (chats) => {
            const processedChats = await Promise.all(chats.map((chat) => processChat(chat._id)));
            
            processedChats.forEach((latestMsg) => {
              const item = recentChat.find((e) => e?.chatId === latestMsg?.chatId);
              if (!item && latestMsg !== undefined) {
                recentChat.push(latestMsg);
              }
            });
            
            return recentChat;
          };
          const response =  await processChats(chat);
          return response 
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
// delete chat

const deleteChat = async (id) => {
    try{
        const res = await Chat.deleteMany({_id:id});
        return res;
    }catch(err){
        throw err;
    }
}


module.exports = {findChat, findUserChats, deleteChat,createChat,findRecentChatInteraction};

