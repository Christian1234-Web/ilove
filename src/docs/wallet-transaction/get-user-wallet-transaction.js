module.exports = {
    // method of operation
    get: {
      tags: ["Wallet Transaction"], // operation's tag.
      description: "Get user wallet transaction", // operation's desc.
      operationId: "getUserWalletTransaction", // unique operation id.
      parameters: [
         {
        name: "id", // name of the param
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
          description: "user wallet transaction were obtained", // response desc.
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