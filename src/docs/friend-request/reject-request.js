
module.exports = {
    post:{
        tags:['Friend Request'],
        description: "Reject friend request",
        operationId: "rejectRequest",
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
                description: "Request rejected successfully"
            },
            '500':{
                description: 'Server error'
            }
        }
    }
}