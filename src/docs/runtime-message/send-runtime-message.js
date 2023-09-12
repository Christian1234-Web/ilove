module.exports = {
    // method of operation
    get: {
      tags: ["Socket Runtime Messages"], // operation's tag.
      description: "Send messages on runtime from socket using socket.emit('sendMessage', {chatId, senderId, message, recipientId})", // operation's desc.
      operationId: "sendRuntimeMessage", // unique operation id.
      parameters: [], // expected params.
      // expected responses
      responses: {
        // response code
        200: {
          description: "message sent on runtime successfully", // response desc.
        },
      },
    },
  }; 