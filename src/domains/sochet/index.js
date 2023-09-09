const { createMessage } = require("../message/controller");

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
// send message 
const sendMessage = async (socket,io) => { 
    socket.on("sendMessage", async (data) => {
        const { chatId, senderId, message, recipientId} = data;
        const room = senderId + ',' + recipientId;
            // const user = onlineUsers.find(user => user.userId === recipientId);
                io.emit(recipientId, data );
            // save message to db.
            const response = await createMessage({chatId,senderId,message});
            // console.log(response);
        })
}
// 



module.exports = {addOnlineUser,getOnlineUser,disConnectUser,sendMessage};
