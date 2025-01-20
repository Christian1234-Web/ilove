module.exports = {
  get: {
    tags: ["Report"],
    description: "Get All Report",
    operationId: "getAllReport",
    parameters: [],
    responses: {
      201: {
        description: "Get all reports successfully",
      },
      400: {
        description: "Server error",
      },
    },
  },
};
