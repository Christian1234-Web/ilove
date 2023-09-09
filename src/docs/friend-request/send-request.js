
module.exports = {
    post:{
        tags:['Friend Request'],
        description: "Send Friend Request",
        operationId: "sendRequest",
        parameters:[],
        requestBody: {
            content:{
                'application/json': {
                    schema:{
                        $ref:'#/components/schemas/FriendRequest'
                    }
                }
            }
        },
        responses:{
            '201':{
                description: "Request sent successfully"
            },
            '500':{
                description: 'Server error'
            }
        }
    }
}