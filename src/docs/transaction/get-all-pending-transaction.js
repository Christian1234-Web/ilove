module.exports = {
  // method of operation
  get: {
    tags: ["Transaction"], // operation's tag.
    description: "Get all transaction", // operation's desc.
    operationId: "getAllPendingTransaction", // unique operation id.
    parameters: [], // expected params.
    // expected responses
    responses: {
      // response code
      200: {
        description: "Transaction were obtained", // response desc.
        content: {
          // content-type
          "application/json": {
            schema: {
              $ref: "#/components/schemas/id", // wallet model
            },
          },
        },
      },
    },
  },
};
