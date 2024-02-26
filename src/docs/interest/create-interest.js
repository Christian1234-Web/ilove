module.exports = {
  post: {
    tags: ["Interest"],
    description: "Create interest",
    operationId: "createInterest",
    parameters: [],
    requestBody: {
      content: {
        "application/json": {
          schema: {
            $ref: "#/components/schemas/Interest",
          },
        },
      },
    },
    responses: {
      201: {
        description: "Interest created successfully",
      },
      400: {
        description: "Server error",
      },
    },
  },
};
