module.exports = {
  // method of operation
  get: {
    tags: ["Transaction"], // operation's tag.
    description: "Get pending transaction", // operation's desc.
    operationId: "getPendingTransaction", // unique operation id.
    parameters: [
      {
        name: "userId", // name of the param
        in: "path", // location of the param
        schema: {
          $ref: "#/components/schemas/id", // data model of the param
        },
        required: true, // Mandatory param
        description: "A  user  id", // param desc.
      },
    ], // expected params.
    // expected responses
    responses: {
      // response code
      200: {
        description: "Pending Transaction were obtained", // response desc.
      },
    },
  },
};
