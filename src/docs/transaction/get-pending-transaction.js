module.exports = {
  // method of operation
  get: {
    tags: ["Transaction"], // operation's tag.
    description: "Get pending transaction", // operation's desc.
    operationId: "getPendingTransaction", // unique operation id.
    parameters: [
      {
        name: "userOne", // name of the param
        in: "path", // location of the param
        schema: {
          $ref: "#/components/schemas/id", // data model of the param
        },
        required: true, // Mandatory param
        description: "A  user one  id", // param desc.
      },
      {
        name: "userTwo", // name of the param
        in: "path", // location of the param
        schema: {
          $ref: "#/components/schemas/id", // data model of the param
        },
        required: true, // Mandatory param
        description: "A  user two  id", // param desc.
      },
    ], // expected params.
    // expected responses
    responses: {
      // response code
      200: {
        description: "Pending Transaction for user and two  were obtained", // response desc.
      },
    },
  },
};
