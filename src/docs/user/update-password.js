
module.exports = {
    post:{
        tags:['User'],
        description: "Update user password",
        operationId: "updateUserPassword",
        parameters:[],
        requestBody: {
            content:{
                'application/json': {
                    schema:{
                        $ref:'#/components/schemas/UpdatePassword'
                    }
                }
            }
        },
        responses:{
            '201':{
                description: "User password updated successfully"
            },
            '500':{
                description: 'Server error'
            }
        }
    }
}