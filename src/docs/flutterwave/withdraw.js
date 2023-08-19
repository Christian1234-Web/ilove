
module.exports = {
    post:{
        tags:['Flutterwave'],
        description: "Withdraw from flutterwave",
        operationId: "flutterwaveWithdraw",
        parameters:[],
        requestBody: {
            content:{
                'application/json': {
                    schema:{
                        $ref:'#/components/schemas/WithdrawFromFlutterwave'
                    }
                }
            }
        },
        responses:{
            '201':{
                description: "Withdraw  successfully"
            },
            '500':{
                description: 'Server error'
            }
        }
    }
}