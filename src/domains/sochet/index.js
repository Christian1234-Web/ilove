const { createMessage } = require("../message/controller");
const User  = require("../user/model");
// add new user or login user or add user to online array
let onlineUsers = []
const addOnlineUser = async (socket,io) => {
    socket.on("addOnlineUser", (userId) => {
        const user = onlineUsers.find(user => user.userId === userId);
        if(!user){
            onlineUsers.push({
                userId,
                socketId: socket.id
            }); 
        } 
        io.emit("getOnlineUsers", onlineUsers);
    })
}
// add remove user or logout user or remove user to online array
const disConnectUser = async (socket,io) => {
    socket.on("disconnect", () => {
        onlineUsers = onlineUsers.filter(user => user.socketId !== socket.id);

        io.emit("getOnlineUsers", onlineUsers);
    })
}
const getOnlineUser = async (socket,io) => {
    socket.on("getOnlineUser", () => {
        io.emit("getOnlineUsers", onlineUsers);
    })
}
// send message and // notification
const sendMessage = async (socket,io) => { 
    socket.on("sendMessage", async (data) => {
        const { chatId, senderId, message, recipientId} = data;
        console.log(data);

             // const user = onlineUsers.find(user => user.userId === recipientId);
            const user = await User.findOne({_id:recipientId});
            const blockedUser = await user.blockedUsers.find(e => e === senderId);
            if(!blockedUser){
                io.emit(recipientId, {...data,isRead:false,date: new Date(), createdAt: new Date(),updatedAt:new Date(),__v:'0',_id:'0' } );
            // save message to db.
            // await createMessage({chatId,senderId,recipientId,message,isRead:true,date:new Date()});
            }
            // frontend will check if i block the recipeint
        })
}


module.exports = {addOnlineUser,getOnlineUser,disConnectUser,sendMessage};
