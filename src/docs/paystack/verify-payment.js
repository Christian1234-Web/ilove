module.exports = {
    // method of operation
    get: {
      tags: ["Paystack"], // operation's tag.
      description: "Verify payment", // operation's desc.
      operationId: "paystackVerifyPayment", // unique operation id.
      parameters: [
        {
       name: "ref", // name of the param
       in: "path", // location of the param
       schema: {
         $ref: "#/components/schemas/id", // data model of the param
       },
       required: true, // Mandatory param
       description: "Transaction reference", // param desc.
     },
     {
      name: "userId", // name of the param
      in: "path", // location of the param
      schema: {
        $ref: "#/components/schemas/id", // data model of the param
      },
      required: true, // Mandatory param
      description: "User Id", // param desc.
    }
    ], // expected params.
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