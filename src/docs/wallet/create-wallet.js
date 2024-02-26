module.exports = {
  post: {
    tags: ["Wallet"],
    description: "Create wallet",
    operationId: "createWallet",
    parameters: [],
    requestBody: {
      content: {
        "application/json": {
          schema: {
            $ref: "#/components/schemas/Wallet",
          },
        },
      },
    },
    responses: {
      201: {
        description: "Wallet created successfully",
      },
      400: {
        description: "Server error",
      },
    },
  },
};
