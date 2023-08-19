module.exports = {
    // method of operation
    get: {
      tags: ["Flutterwave"], // operation's tag.
      description: "Get flutterwave  banks", // operation's desc.
      operationId: "getFlutterwaveBanks", // unique operation id.
      parameters: [], // expected params.
      // expected responses
      responses: {
        // response code
        200: {
          description: "Flutterwave banks  obtained", // response desc.
        },
      },
    },
  };