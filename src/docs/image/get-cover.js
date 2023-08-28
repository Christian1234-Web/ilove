module.exports = {
    // method of operation
    get: {
      tags: ["Upload Profile and Cover Image"], // operation's tag.
      description: "Get cover", // operation's desc.
      operationId: "getCover", // unique operation id.
      parameters: [], // expected params.
      // expected responses
      responses: {
        // response code
        200: {
          description: "Cover pics were obtained", // response desc.
        },
      },
    },
  };