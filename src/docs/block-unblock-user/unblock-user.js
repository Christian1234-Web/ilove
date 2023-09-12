
module.exports = {
    post:{
        tags:['Block And Unblock'],
        description: "unBlock user",
        operationId: "unBlockUser",
        parameters:[],
        requestBody: {
            content:{
                'application/json': {
                    schema:{
                        $ref:'#/components/schemas/UnBlockUser'
                    }
                }
            }
        },
        responses:{
            '201':{
                description: "User Unblocked  successfully"
            },
            '500':{
                description: 'Server error' 
            }
        }
    }
}