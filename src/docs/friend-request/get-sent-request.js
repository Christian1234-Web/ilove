module.exports = {
    // method of operation
    get: {
      tags: ["Friend Request"], // operation's tag.
      description: "Get sent friend request", // operation's desc.
      operationId: "getSentRequest", // unique operation id.
      parameters: [
        {
          name: "userId", // name of the param
          in: "path", // location of the param
          schema: {
            $ref: "#/components/schemas/id", // data model of the param
          },
          required: true, // Mandatory param
          description: "A  user id", // param desc.
        },
      ],
      // expected responses
      responses: {
        // response code
        200: {
          description: "User sent friend request obtained", // response desc.
        },
      },
    },
  }; 