const mongoose = require("mongoose");

const FriendRquestSchema = new mongoose.Schema(
    {
    senderId: { type: mongoose.Schema.Types.ObjectId, ref: "User"},
    receiverId: { type: mongoose.Schema.Types.ObjectId, ref: "User"}
  },
{ timestamps: true }
);


const FriendRquest = mongoose.model("FriendRquest", FriendRquestSchema);

module.exports = FriendRquest;