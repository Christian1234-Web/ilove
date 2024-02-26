module.exports = {
  post: {
    tags: ["Transaction"],
    description: "Approve Pending Transaction",
    operationId: "approvePendingTransaction",
    parameters: [],
    requestBody: {
      content: {
        "application/json": {
          schema: {
            $ref: "#/components/schemas/ApproveOrDisapproveTransaction",
          },
        },
      },
    },
    responses: {
      201: {
        description: "Pending Transaction approve successfully",
      },
      400: {
        description: "Server error",
      },
    },
  },
};
