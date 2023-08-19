module.exports = {
    // method of operation
    post: {
      tags: ["Flutterwave"], // operation's tag.
      description: "Verify payment", // operation's desc.
      operationId: "flutterwaveVerifyPayment", // unique operation id.
      parameters: [], // expected params.
      // expected responses
      responses: {
        // response code
        200: {
          description: "payment verified successfully", // response desc.
          content: {
            // content-type
            "application/json": {
              schema: {
                $ref: "#/components/schemas/VerifyFlutterwavePayment", // wallet model
              },
            },
          },
        },
      },
    },
  };