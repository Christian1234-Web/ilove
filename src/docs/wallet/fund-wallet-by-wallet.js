module.exports = {
  post: {
    tags: ["Wallet"],
    description: "Fund another user wallet with wallet balance",
    operationId: "creditAnotherWalletFromWalletBalance",
    parameters: [],
    requestBody: {
      content: {
        "application/json": {
          schema: {
            $ref: "#/components/schemas/FundAnotherWalletByWallet",
          },
        },
      },
    },
    responses: {
      201: {
        description: "Pending Transaction created successfully",
      },
      400: {
        description: "Server error",
      },
    },
  },
};
