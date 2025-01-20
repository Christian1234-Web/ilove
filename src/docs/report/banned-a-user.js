module.exports = {
  post: {
    tags: ["Report"],
    description: "Ban a user",
    operationId: "BannedUser",
    parameters: [],
    requestBody: {
      content: {
        "application/json": {
          schema: {
            $ref: "#/components/schemas/BannedUser",
          },
        },
      },
    },
    responses: {
      201: {
        description: "User banned  successfully",
      },
      400: {
        description: "Server error",
      },
    },
  },
};
