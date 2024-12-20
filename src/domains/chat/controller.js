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
// recent chat interaction
// const findRecentChatInteraction = async (userId) => {
//     try{
//         const chat = await Chat.find({
//             members:{$in: [userId]}
//         });
//         const recentChat = [];

//         const processChat = async (chatId) => {
//             const messages = await getMessages(chatId);
//             const latestMsg = messages[messages.length - 1];
//             const recentChatUser = await getSingleUser(latestMsg?.senderId.toString() === userId? latestMsg?.recipientId : latestMsg?.senderId);
//             const newLatestMsg = {
//                 _id:latestMsg?._id,
//                 chatId:latestMsg?.chatId,
//                 message:latestMsg?.message,
//                 createdAt:latestMsg?.createdAt,
//                 updatedAt:latestMsg?.updatedAt,
//                 __v:"0",
//                 date:latestMsg?.date,
//                 isRead:latestMsg?.isRead,
//                 recentChatUser
//             }
//             return newLatestMsg;
//           };
//         const processChats = async (chats) => {
//             const processedChats = await Promise.all(chats.map((chat) => processChat(chat._id)));
            
//             processedChats.forEach((newLatestMsg) => {
//               const item = recentChat.find((e) => e?.chatId === newLatestMsg?.chatId);
//               if (!item && newLatestMsg?.recentChatUser !== null) {
//                 recentChat.push(newLatestMsg);
//               }
//             });
            
//             return recentChat;
//           };
//           const response =  await processChats(chat);
//         return response;
//     }catch(err){ 
//         throw err;
//     }
// }


const findRecentChatInteraction = async (userId) => {
    try {
        // Fetch all chats where the user is a member
        const chats = await Chat.find({
            members: { $in: [userId] }
        });

        const recentChat = [];

        // Function to process each chat
        const processChat = async (chatId) => {
            // Get messages from chat
            const messages = await getMessages(chatId);
            if (messages.length === 0) return null;

            // Get the latest message
            const latestMsg = messages[messages.length - 1];

            // Determine the other participant's user ID
            const otherUserId = latestMsg.senderId.toString() === userId ? latestMsg.recipientId : latestMsg.senderId;

            // Fetch user details for the recent chat user
            const recentChatUser = await getSingleUser(otherUserId);
            
            // Construct a new latest message object
            const newLatestMsg = {
                _id: latestMsg._id,
                chatId: latestMsg.chatId,
                message: latestMsg.message,
                createdAt: latestMsg.createdAt,
                updatedAt: latestMsg.updatedAt,
                __v: "0",
                date: latestMsg.date,
                isRead: latestMsg.isRead,
                recentChatUser
            };
            return newLatestMsg;
        };

        // Process each chat and get the latest messages
        const processedChats = await Promise.all(chats.map((chat) => processChat(chat._id)));

        // Filter out null results (no messages in chat)
        const filteredChats = processedChats.filter(chat => chat !== null);

        // Update the recentChat array
        filteredChats.forEach((newLatestMsg) => {
            const item = recentChat.find((e) => e.chatId === newLatestMsg.chatId);
            if (!item && newLatestMsg.recentChatUser !== null) {
                recentChat.push(newLatestMsg);
            }
        });

        return recentChat;
    } catch (err) {
        throw err;
    }
};

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

