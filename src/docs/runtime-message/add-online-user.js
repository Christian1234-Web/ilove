module.exports = {
    // method of operation
    get: {
      tags: ["Socket Runtime Messages"], // operation's tag.
      description: "Add User Online from socket using socket.emit('addOnlineUser', 'userId')", // operation's desc.
      operationId: "addUserOnline", // unique operation id.
      parameters: [], // expected params.
      // expected responses
      responses: {
        // response code
        200: {
          description: "user added online successfully", // response desc.
        },
      },
    },
  }; 