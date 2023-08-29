module.exports = {
    // method of operation
    get: {
      tags: ["Chat"], // operation's tag.
      description: "Get user chat", // operation's desc.
      operationId: "getUserChat", // unique operation id.
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
      ], // expected params.
      // expected responses
      responses: {
        // response code
        200: {
          description: "user chat were obtained", // response desc.
         
        },
      },
    },
  };