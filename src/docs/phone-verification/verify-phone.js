
module.exports = {
    post:{
        tags:['Phone Number Verification'],
        description: "verify sms",
        operationId: "verifySms",
        parameters:[],
        requestBody: {
            content:{
                'application/json': {
                    schema:{
                        $ref:'#/components/schemas/VerifyPhoneOtp'
                    }
                }
            }
        },
        responses:{
            '201':{
                description: "Phone number verirfied successfully"
            },
            '500':{
                description: 'Server error'
            }
        }
    }
}