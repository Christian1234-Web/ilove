module.exports = {
  post: {
    tags: ["Report"],
    description: "Unban a user",
    operationId: "UnbannedUser",
    parameters: [],
    requestBody: {
      content: {
        "application/json": {
          schema: {
            $ref: "#/components/schemas/UnBannedUser",
          },
        },
      },
    },
    responses: {
      201: {
        description: "User Unbanned  successfully",
      },
      400: {
        description: "Server error",
      },
    },
  },
};
