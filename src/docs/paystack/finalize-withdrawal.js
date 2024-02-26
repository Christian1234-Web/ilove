module.exports = {
  post: {
    tags: ["Paystack"],
    description: "Finalize withdrawal from wallet",
    operationId: "finalizeWithdrawal",
    parameters: [],
    requestBody: {
      content: {
        "application/json": {
          schema: {
            $ref: "#/components/schemas/FinalizeWithdrawal",
          },
        },
      },
    },
    responses: {
      201: {
        description: "Wallet Withdrawal is successfull",
      },
      400: {
        description: "Server error",
      },
    },
  },
};
