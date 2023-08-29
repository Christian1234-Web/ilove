module.exports = {
    // method of operation
    get: {
      tags: ["Chat"], // operation's tag.
      description: "Get chats between both user", // operation's desc.
      operationId: "getWallet", // unique operation id.
      parameters: [
        {
          name: "firstId", // name of the param
          in: "path", // location of the param
          schema: {
            $ref: "#/components/schemas/id", // data model of the param
          },
          required: true, // Mandatory param
          description: "A  user id", // param desc.
        },
        {
          name: "secondId", // name of the param
          in: "path", // location of the param
          schema: {
            $ref: "#/components/schemas/id", // data model of the param
          },
          required: true, // Mandatory param
          description: "A  user id", // param desc.
        },
      ], // expected params.
      // expected responses
      responses: {
        // response code
        200: {
          description: "chats between the both user were obtained", // response desc.
        },
      },
    },
  }; 