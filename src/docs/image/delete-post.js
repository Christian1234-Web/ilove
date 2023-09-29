module.exports = {
    // method of operation
    delete: {
      tags: ["Post Image"], // operation's tag.
      description: "Delete Post", // operation's desc.
      operationId: "deletePost", // unique operation id.
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
          description: "post deleted sucessfully", // response desc.
        },
      },
    },
  };