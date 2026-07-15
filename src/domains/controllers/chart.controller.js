const Message = require('../message/model');
const { getSocketIO } = require("../sochet");
// 1. GET /admin/chat/transcript/:chatId[cite: 1]
exports.getChatTranscript = async (req, res, next) => {
  try {
    const { chatId } = req.params; //[cite: 1]
    
    // Fetch conversations sorted by time sequence
    const transcripts = await Message.find({ chatId }) //[cite: 1]
      .populate('senderId', 'username profilePic')
      .sort({ createdAt: 1 });

    return res.status(200).json({
      status: 'success',
      data: transcripts
    });
  } catch (error) {
    next(error);
  }
};

// 2. POST /admin/chat/warn[cite: 1]
exports.injectChatWarning = async (req, res, next) => {
  try {
    const { chatId, message } = req.body; //[cite: 1]

    // Save a text-bubble event record directly into the chat stream
    const systemNotice = await Message.create({
      chatId, //[cite: 1]
      message, //[cite: 1]
      isSystemWarning: true
    });

    // NOTE: If using WebSockets (Socket.io), emit the notice to the room namespace here
 // Send to everyone in the chat
io.emit(`chat-warning-${chatId}`, systemNotice);

// Notify admin dashboard
io.emit("admin:new-warning", systemNotice);

    return res.status(200).json({
      status: 'success',
      message: 'System warning sent successfully', //[cite: 1]
      data: systemNotice
    });
  } catch (error) {
    next(error);
  }
}; 

// 3. GET /admin/chat/flagged
// Function: Retrieve lists of active/reported text channels.
exports.getFlaggedChats = async (req, res, next) => {
  try {
    // We use MongoDB aggregation to find unique chatIds that contain flagged/system warning content
    const flaggedRooms = await Message.aggregate([
      { 
        $match: { isSystemWarning: true } // Filters for rooms that triggered security warnings
      },  
      {
        $sort: { createdAt: -1 } // Keep the latest messages on top
      },
      {
        $group: {
          _id: "$chatId", // Group by the unique room ID to avoid duplicates
          latestMessage: { $first: "$message" }, //[cite: 1]
          createdAt: { $first: "$createdAt" }, //[cite: 1]
          isRead: { $first: { $literal: false } } // Dynamic helper flag for your admin panel dashboard state[cite: 1]
        }
      },
      {
        $project: {
          _id: 1,
          chatId: "$_id", //[cite: 1]
          message: "$latestMessage", //[cite: 1]
          createdAt: 1, //[cite: 1]
          isRead: 1, //[cite: 1]
          // Mocking empty participant details—populate these dynamically from your main matching schemas if needed[cite: 1]
          participants: {
            user1: { _id: "u1", username: "chioma_grace", profilePic: "https://url-to-pic.jpg" }, //[cite: 1]
            user2: { _id: "u4", username: "tunde_real", profilePic: "https://url-to-pic.jpg" } //[cite: 1]
          }
        }
      },
      { $sort: { createdAt: -1 } }
    ]);

    return res.status(200).json({
      status: 'success',
      data: flaggedRooms
    });
  } catch (error) {
    next(error);
  }
};