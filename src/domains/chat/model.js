const mongoose = require("mongoose");

const ChatSchema = new mongoose.Schema(
    {
    members: { type: Array, required:true }
  },
{ timestamps: true }
);


const Chat = mongoose.model("Chat", ChatSchema);

module.exports = Chat;