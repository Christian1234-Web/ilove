module.exports = {
  post: {
    tags: ["Interest"],
    description: "Add interest",
    operationId: "addInterest",
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
        description: "Interest added successfully",
      },
      400: {
        description: "Server error",
      },
    },
  },
};
