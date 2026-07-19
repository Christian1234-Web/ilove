module.exports = {
  // method of operation
  get: {
    tags: ["Report"], // operation's tag.
    description: "Get Report by Report Id", // operation's desc.
    operationId: "getReportByReportId", // unique operation id.
    parameters: [
      {
        name: "reporterId", // name of the param
        in: "path", // location of the param
        schema: {
          $ref: "#/components/schemas/id", // data model of the param
        },
        required: true, // Mandatory param
        description: "reporter  id", // param desc.
      },
    ], // expected params.
    // expected responses
    responses: {
      // response code
      200: {
        description: "report obtained", // response desc.
        content: {
          // content-type
          "application/json": {
            schema: {
              $ref: "#/components/schemas/CreateReport", // wallet model
            },
          },
        },
      },
    },
  },
};