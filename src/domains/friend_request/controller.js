const FriendRquest = require("./model");
const { createChat } = require("../chat/controller");

//create chat
const sendRequest = async ({ senderId, receiverId }) => {
  try {
    const request = await FriendRquest.findOne({ senderId, receiverId });

    if (request) {
      throw Error("User has already sent a friend request");
    }

    const newRequest = new FriendRquest({
      senderId,
      receiverId,
    });

    const response = await newRequest.save();

    return { response };
  } catch (err) {
    throw err;
  }
};
//get user send request
const findUserSendRquest = async (userId) => {
  try {
    const request = await FriendRquest.find({ senderId: userId }).populate(
      "receiverId"
    );
    return { request };
  } catch (err) {
    throw err;
  }
};
//get user send request
const findUserRecieveRquest = async (userId) => {
  try {
    const request = await FriendRquest.find({ receiverId: userId }).populate(
      "senderId"
    );
    return { request };
  } catch (err) {
    throw err;
  }
};
// accept request
const acceptRequest = async ({ requestId }) => {
  try {
    const request = await FriendRquest.findOne({ _id: requestId });
    if (request) {
      const { senderId, receiverId } = request;
      // add user to chat or
      const chat = await createChat(senderId.toString(), receiverId.toString());
      if (chat) {
        await FriendRquest.deleteOne({ _id: requestId });
        return chat._id;
      }
    } else {
      throw Error("Request not found");
    }
  } catch (err) {
    throw err;
  }
};
// reject request
const rejectRequest = async ({ requestId }) => {
  try {
    const request = await FriendRquest.findOne({ _id: requestId });
    if (request) {
      await FriendRquest.deleteOne({ _id: requestId });
    }
    return;
  } catch (err) {
    throw err;
  }
};
// delete all request
const deleteAllRequest = async (senderId) => {
  try {
    const res = await FriendRquest.deleteMany(senderId);

    return res;
  } catch (err) {
    throw err;
  }
};
module.exports = {
  findUserSendRquest,
  findUserRecieveRquest,
  sendRequest,
  deleteAllRequest,
  acceptRequest,
  rejectRequest,
};
