module.exports = {
    // method of operation
    get: {
      tags: ["Chat"], // operation's tag.
      description: "Get chats message for both using chat id", // operation's desc.
      operationId: "getWallet", // unique operation id.
      parameters: [
        {
          name: "userId", // name of the param
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
          description: "recent chats interaction obtained", // response desc.
        },
      },
    },
  }; 