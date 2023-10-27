const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
    {
      chatId: {type:String, required:true},
      senderId: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
      recipientId: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
      message: {type:String, required:true},
      isRead:{type:Boolean, default:true},
      date:{type:Date, default:new Date()}
  },
{ timestamps: true }
);


const Message = mongoose.model("Message", messageSchema);

module.exports = Message;