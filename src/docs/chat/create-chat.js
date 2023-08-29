
module.exports = {
    post:{
        tags:['Chat'],
        description: "Create chat",
        operationId: "createChat",
        parameters:[],
        requestBody: {
            content:{
                'application/json': {
                    schema:{
                        $ref:'#/components/schemas/Chat'
                    }
                }
            }
        },
        responses:{
            '201':{
                description: "Chat created successfully"
            },
            '500':{
                description: 'Server error'
            }
        }
    }
}