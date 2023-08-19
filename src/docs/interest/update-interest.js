
module.exports = {
    put:{
        tags:['Interest'],
        description: "Update  interest",
        operationId: "updateUser",
        parameters:[
            {
                name: "id", // name of the param
                in: "path", // location of the param
                schema: {
                  $ref: "#/components/schemas/id", // data model of the param
                },
                required: true, // Mandatory param
                description: "A  interest id", // param desc.
              },
        ],
        requestBody: {
            content:{
                'application/json': {
                    schema:{
                        $ref:'#/components/schemas/UpdateInterest'
                    }
                }
            }
        },
        responses:{
            '201':{
                description: "Interest updated successfully"
            },
            '500':{
                description: 'Server error'
            }
        }
    }
}