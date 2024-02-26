module.exports = {
  post: {
    tags: ["Transaction"],
    description: "Disapprove Pending Transaction",
    operationId: "DisapprovePendingTransaction",
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
        description: "Pending Transaction disapprove successfully",
      },
      400: {
        description: "Server error",
      },
    },
  },
};
