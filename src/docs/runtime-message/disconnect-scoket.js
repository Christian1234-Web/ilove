module.exports = {
    // method of operation
    get: {
      tags: ["Socket Runtime Messages"], // operation's tag.
      description: "Disconneet from socket using socket.emit('disconnect')", // operation's desc.
      operationId: "disconnetFromSochet", // unique operation id.
      parameters: [], // expected params.
      // expected responses
      responses: {
        // response code
        200: {
          description: "user disconnect successfully", // response desc.
         
        },
      },
    },
  };