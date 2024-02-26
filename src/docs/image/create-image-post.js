module.exports = {
  post: {
    tags: ["Post Image"],
    description: "Post  Image",
    operationId: "postImage",
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
    ],
    requestBody: {
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              image: {
                type: "string",
              },
            },
            description: "A image url", // desc
          },
        },
      },
    },
    responses: {
      201: {
        description: "Image posted successfully",
      },
      400: {
        description: "Server error",
      },
    },
  },
};
