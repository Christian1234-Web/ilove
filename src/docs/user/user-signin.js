
module.exports = {
    post:{
        tags:['User'],
        description: "sigin user",
        operationId: "signinUser",
        parameters:[],
        requestBody: {
            content:{
                'application/json': {
                    schema:{
                        $ref:'#/components/schemas/SiginUser'
                    }
                }
            }
        },
        responses:{
            '201':{
                description: "User signin successfully"
            },
            '500':{
                description: 'Server error'
            }
        }
    }
}