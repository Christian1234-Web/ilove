module.exports = {
  post: {
    tags: ["Paystack"],
    description: "Initiate Withdrawal from paystack",
    operationId: "paysackInitiateWithdraw",
    parameters: [],
    requestBody: {
      content: {
        "application/json": {
          schema: {
            $ref: "#/components/schemas/InitiateWithdrawal",
          },
        },
      },
    },
    responses: {
      201: {
        description: "Withdrawal  successfully initiated",
      },
      500: {
        description: "Server error",
      },
    },
  },
};
