module.exports = {
    // method of operation
    get: {
      tags: ["Message"], // operation's tag.
      description: "Get chats message for both using chat id", // operation's desc.
      operationId: "getWallet", // unique operation id.
      parameters: [
        {
          name: "chatId", // name of the param
          in: "path", // location of the param
          schema: {
            $ref: "#/components/schemas/id", // data model of the param
          },
          required: true, // Mandatory param
          description: "A  chat id", // param desc.
        },
      ],
      // expected responses
      responses: {
        // response code
        200: {
          description: "chats between the both user were obtained", // response desc.
        },
      },
    },
  }; 