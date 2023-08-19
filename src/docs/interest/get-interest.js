module.exports = {
    // method of operation
    get: {
      tags: ["Interest"], // operation's tag.
      description: "Get interest", // operation's desc.
      operationId: "getInterest", // unique operation id.
      parameters: [], // expected params.
      // expected responses
      responses: {
        // response code
        200: {
          description: "Interest were obtained", // response desc.
          },
      },
    },
  };