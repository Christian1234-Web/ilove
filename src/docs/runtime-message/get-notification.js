module.exports = {
  // method of operation
  get: {
    tags: ["Socket Runtime Messages"], // operation's tag.
    description: "Get message notification and messages sent to you by listening to your user Id, example using socket.on(userId,(arg) => { console.log(arg)});", // operation's desc.
    operationId: "getRuntimeNotification", // unique operation id.
    parameters: [], // expected params.
    // expected responses
    responses: {
      // response code
      200: {
        description: "user notification of messages were obtained on runtime", // response desc.
       
      },
    },
  },
};