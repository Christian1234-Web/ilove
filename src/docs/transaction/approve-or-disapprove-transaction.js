
module.exports = {
    post:{
        tags:['Transaction'],
        description: "Approve or Disapprove Pending Transaction",
        operationId: "adpt",
        parameters:[],
        requestBody: {
            content:{
                'application/json': {
                    schema:{
                        $ref:'#/components/schemas/ApproveOrDisapproveTransaction'
                    }
                }
            }
        },
        responses:{
            '201':{
                description: "Pending Transaction approve or disapprove successfully"
            },
            '500':{
                description: 'Server error'
            }
        }
    }
}