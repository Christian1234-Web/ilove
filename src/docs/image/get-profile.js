module.exports = {
    // method of operation
    get: {
      tags: ["Upload Profile and Cover Image"], // operation's tag.
      description: "Get profile pics", // operation's desc.
      operationId: "getProfile", // unique operation id.
      parameters: [], // expected params.
      // expected responses
      responses: {
        // response code
        200: {
          description: "profile pics  were obtained", // response desc.
        },
      },
    },
  };