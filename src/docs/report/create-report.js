module.exports = {
  post: {
    tags: ["Report"],
    description: "Create Report",
    operationId: "CreateReport",
    parameters: [],
    requestBody: {
      content: {
        "application/json": {
          schema: {
            $ref: "#/components/schemas/CreateReport",
          },
        },
      },
    },
    responses: {
      201: {
        description: "Create Report Successfully",
      },
      400: {
        description: "Server error",
      },
    },
  },
};
