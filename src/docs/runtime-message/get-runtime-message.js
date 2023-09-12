module.exports = {
    // method of operation
    get: {
      tags: ["Socket Runtime Messages"], // operation's tag.
      description: "Get messages sent to you by listening to your user Id, example using socket.on(userId,(arg) => { console.log(arg)});", // operation's desc.
      operationId: "getRuntimeMessages", // unique operation id.
      parameters: [], // expected params.
      // expected responses
      responses: {
        // response code
        200: {
          description: "user messages sent on runtime were obtained", // response desc.
         
        },
      },
    },
  };