module.exports = {
  post: {
    tags: ["Message"],
    description: "Send Message",
    operationId: "sendChat",
    parameters: [],
    requestBody: {
      content: {
        "application/json": {
          schema: {
            $ref: "#/components/schemas/Message",
          },
        },
      },
    },
    responses: {
      201: {
        description: "Message sent successfully",
      },
      400: {
        description: "Server error",
      },
    },
  },
};
