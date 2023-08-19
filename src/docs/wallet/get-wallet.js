module.exports = {
    // method of operation
    get: {
      tags: ["Wallet"], // operation's tag.
      description: "Get wallets", // operation's desc.
      operationId: "getWallet", // unique operation id.
      parameters: [], // expected params.
      // expected responses
      responses: {
        // response code
        200: {
          description: "Wallets were obtained", // response desc.
        //   content: {
        //     // content-type
        //     "application/json": {
        //       schema: {
        //         $ref: "#/components/schemas/Wallet", // wallet model
        //       },
        //     },
        //   },
        },
      },
    },
  };