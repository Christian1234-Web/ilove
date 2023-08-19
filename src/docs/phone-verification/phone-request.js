
module.exports = {
    post:{
        tags:['Phone Number Verification'],
        description: "send sms",
        operationId: "sendSms",
        parameters:[],
        requestBody: {
            content:{
                'application/json': {
                    schema:{
                        $ref:'#/components/schemas/RequestPhoneOtp'
                    }
                }
            }
        },
        responses:{
            '201':{
                description: "sms sent successfully"
            },
            '500':{
                description: 'Server error'
            }
        }
    }
}