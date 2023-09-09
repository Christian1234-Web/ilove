
module.exports = {
    post:{
        tags:['Friend Request'],
        description: "Accept friend request",
        operationId: "acceptRequest",
        parameters:[],
        requestBody: {
            content:{
                'application/json': {
                    schema:{
                        $ref:'#/components/schemas/AcceptOrRejectRequest'
                    }
                }
            }
        },
        responses:{
            '201':{
                description: "Request accepted successfully"
            },
            '500':{
                description: 'Server error'
            }
        }
    }
}