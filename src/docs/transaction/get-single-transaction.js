module.exports = {
    // method of operation
    get: {
      tags: ["Transaction"], // operation's tag.
      description: "Get single transaction", // operation's desc.
      operationId: "getSingleTransaction", // unique operation id.
      parameters: [
         {
        name: "transactionId", // name of the param
        in: "path", // location of the param
        schema: {
          $ref: "#/components/schemas/id", // data model of the param
        },
        required: true, // Mandatory param
        description: "A  transaction  id", // param desc.
      },
      ], // expected params.
      // expected responses
      responses: {
        // response code
        200: {
          description: "Transaction were obtained", // response desc.
        },
      },
    },
  };