const { getMessages } = require("../message/controller");
const { getSingleUser } = require("../user/controller");
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

        if(chat) return chat;

        const newChat  = new Chat({
            members: [firstId,secondId]
        })
        
        const response = await newChat.save();

        return response
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
        return chat
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
        // console.log(chat)
        const recentChat = [];

        const processChat = async (chatId) => {
            const messages = await getMessages(chatId);
            // chatId user,message,isRead,date
            const latestMsg = messages[messages.length - 1];
            const recentChatUser = await getSingleUser(latestMsg?.senderId === userId? latestMsg?.recipientId : latestMsg?.senderId);
            const newLatestMsg = {
                _id:latestMsg?._id,
                chatId:latestMsg?.chatId,
                message:latestMsg?.message,
                createdAt:latestMsg?.createdAt,
                updatedAt:latestMsg?.updatedAt,
                __v:"0",
                date:latestMsg?.date,
                isRead:latestMsg?.isRead,
                recentChatUser
            }
            return newLatestMsg;
          };
        const processChats = async (chats) => {
            const processedChats = await Promise.all(chats.map((chat) => processChat(chat._id)));
            
            processedChats.forEach((newLatestMsg) => {
              const item = recentChat.find((e) => e?.chatId === newLatestMsg?.chatId);
            //   console.log(latestMsg)
              if (!item && newLatestMsg !== undefined) {
                recentChat.push(newLatestMsg);
              }
            });
            
            return recentChat;
          };
          const response =  await processChats(chat);
        //   console.log(response) 
        return response;
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
        return chat
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

