const { createMessage } = require("../message/controller");
const User = require("../user/model");
// add new user or login user or add user to online array
let onlineUsers = [];
const addOnlineUser = async (socket, io) => {
  socket.on("addOnlineUser", (userId) => {
    const user = onlineUsers.find((user) => user.userId === userId);
    if (!user) {
      onlineUsers.push({
        userId,
        socketId: socket.id,
      });
    }
    console.log(onlineUsers)
    io.emit("getOnlineUsers", onlineUsers);
  });
};
// add remove user or logout user or remove user to online array
const disConnectUser = async (socket, io) => {
  socket.on("disconnect", () => {
    onlineUsers = onlineUsers.filter((user) => user.socketId !== socket.id);

    io.emit("getOnlineUsers", onlineUsers);
  });
};
const getOnlineUser = async (socket, io) => {
  socket.on("getOnlineUser", () => {
    io.emit("getOnlineUsers", onlineUsers);
  });
};
// send message and // notification
const sendMessage = async (socket, io) => {
  socket.on("sendMessage", async (data) => {
    try{

    
    const { chatId, senderId, message, recipientId } = data;
    
     // Check if the sender is blocked
     const user = await User.findById(senderId); // Ensure the user is found
     const blockedUsers = user ? user.blockedUsers : [];
     const isBlocked = blockedUsers.some((blockedUser) => blockedUser.toString() === recipientId);

      if (isBlocked) {
        // Do not send the message
        return socket.emit("error", { message: "Message cannot be sent. Recipient has blocked you." });
      }
      //do not send the message
      // socket.to(recipientId).emit("receiveMessage", {
      io.emit(recipientId, {
        ...data,
        isRead: false,
        date: new Date(), 
        createdAt: new Date(),
        updatedAt: new Date(),
        __v: 0, 
        _id: 0,
      });

      // save message to db.
       await createMessage({
        chatId,
        senderId,
        recipientId,
        message,
        isRead: true,
        date: new Date(),
      });
    
    // frontend will check if i block the recipeint
    }
    catch(err){
      console.error("Error in sendMessage:", err);
      socket.emit("error", { message: "An error occurred while sending the message." });
    }
  });
};

// notifications

const sendNotifications = async (io, data) => {
  // socket.on("notifications", async (userId) => {
  // const user = onlineUsers.find(user => user.userId === recipientId);
  console.log(io, data, "test");
  io.emit(data.userId, {
    message: data.message,
    isRead: false,
    date: new Date(),
    createdAt: new Date(),
    updatedAt: new Date(),
    __v: 0,
    _id: 0,
  });
  // });
};
// const sendMessage = async (socket, io) => {
//   socket.on("sendMessage", async (data) => {
//     try {
//       const { chatId, senderId, message, recipientId } = data;

//       // Check if the sender is blocked
//       const blockedUsers = await User.blockedUsers; // Assuming `blockedUsers` is an array
//       const isBlocked = blockedUsers.includes(recipientId);

//       if (isBlocked) {
//         // Do not send the message
//         return socket.emit("error", { message: "Message cannot be sent. Recipient has blocked you." });
//       }

//       // Save the message to the database
//       const msg = await createMessage({
//         chatId,
//         senderId,
//         recipientId,
//         message,
//         isRead: false, // Since it's just sent
//         date: new Date(),
//       });

//       // Emit the message to the recipient
//       socket.to(recipientId).emit("receiveMessage", {
//         ...data,
//         isRead: false,
//         date: new Date(),
//         createdAt: new Date(),
//         updatedAt: new Date(),
//         _id: msg._id, // Use the ID from the database
//       });
//     } catch (error) {
//       console.error("Error in sendMessage:", error);
//       socket.emit("error", { message: "An error occurred while sending the message." });
//     }
//   });
// };

module.exports = {
  addOnlineUser,
  getOnlineUser,
  disConnectUser,
  sendMessage,
  sendNotifications,
};
