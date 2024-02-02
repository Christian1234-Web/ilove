module.exports = {
  // method of operation
  get: {
    tags: ["Paystack"], // operation's tag.
    description: "Get all paystack  banks", // operation's desc.
    operationId: "getAllPaystackBank", // unique operation id.
    parameters: [], // expected params.
    // expected responses
    responses: {
      // response code
      200: {
        description: "Paysctack banks  obtained", // response desc.
      },
    },
  },
};
