module.exports = {
  post: {
    tags: ["Paystack"],
    description: "Withdraw from paystack",
    operationId: "paystackWithdraw",
    parameters: [],
    requestBody: {
      content: {
        "application/json": {
          schema: {
            $ref: "#/components/schemas/WithdrawFromPaystack",
          },
        },
      },
    },
    responses: {
      201: {
        description: "Withdraw successfully",
      },
      400: {
        description: "Server error",
      },
    },
  },
};
