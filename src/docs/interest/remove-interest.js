module.exports = {
  post: {
    tags: ["Interest"],
    description: "Remove interest",
    operationId: "removeInterest",
    parameters: [],
    requestBody: {
      content: {
        "application/json": {
          schema: {
            $ref: "#/components/schemas/AddInterest",
          },
        },
      },
    },
    responses: {
      201: {
        description: "Interest remove successfully",
      },
      400: {
        description: "Server error",
      },
    },
  },
};
