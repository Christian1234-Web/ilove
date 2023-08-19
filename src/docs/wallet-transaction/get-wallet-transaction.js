module.exports = {
    // method of operation
    get: {
      tags: ["Wallet Transaction"], // operation's tag.
      description: "Get wallet transaction", // operation's desc.
      operationId: "getWalletTransaction", // unique operation id.
      parameters: [], // expected params.
      // expected responses
      responses: {
        // response code
        200: {
          description: "Wallet transaction were obtained", // response desc.
        },
      },
    },
  };