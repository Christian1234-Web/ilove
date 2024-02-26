module.exports = {
  post: {
    tags: ["Block And Unblock"],
    description: "Block user",
    operationId: "blockUser",
    parameters: [],
    requestBody: {
      content: {
        "application/json": {
          schema: {
            $ref: "#/components/schemas/BlockUser",
          },
        },
      },
    },
    responses: {
      201: {
        description: "User Blocked created successfully",
      },
      400: {
        description: "Server error",
      },
    },
  },
};
