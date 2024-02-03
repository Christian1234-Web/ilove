module.exports = {
  post: {
    tags: ["Paystack"],
    description: "Get user bank detials",
    operationId: "paystackGetUserBankDetails",
    parameters: [],
    requestBody: {
      content: {
        "application/json": {
          schema: {
            $ref: "#/components/schemas/GetUserBankDetails",
          },
        },
      },
    },
    responses: {
      201: {
        description: "User bank  successfully obtained",
      },
      500: {
        description: "Server error",
      },
    },
  },
};
