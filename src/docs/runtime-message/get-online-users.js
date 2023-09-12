module.exports = {
  // method of operation
  get: {
    tags: ["Socket Runtime Messages"], // operation's tag.
    description: "Get online users by listening to getOnlineUser, example using socket.on('getOnlineUser',(arg) => { console.log(arg)});", // operation's desc.
    operationId: "getOnlineUsers", // unique operation id.
    parameters: [], // expected params.
    // expected responses
    responses: {
      // response code
      200: {
        description: "online users were obtained on runtime", // response desc.
       
      },
    },
  },
};