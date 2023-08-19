
module.exports = {
    post:{
        tags:['Interest'],
        description: "Add interest",
        operationId: "addInterest",
        parameters:[],
        requestBody: {
            content:{
                'application/json': {
                    schema:{
                        $ref:'#/components/schemas/AddInterest'
                    }
                }
            }
        },
        responses:{
            '201':{
                description: "Interest added successfully"
            },
            '500':{
                description: 'Server error'
            }
        }
    }
}