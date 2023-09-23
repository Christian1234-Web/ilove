
module.exports = {
    post:{
        tags:['Upload Profile and Cover Image'],
        description: "Upload  profile pic",
        operationId: "uploadProfile",
        parameters:[
            { 
                name: "id", // name of the param
                in: "path", // location of the param
                schema: {
                  $ref: "#/components/schemas/id", // data model of the param
                },
                required: true, // Mandatory param
                description: "A  user id", // param desc.
              },      
        ],
        requestBody: { 
            content:{
                'multipart/form-data': {
                    schema:{
                        type:'object',
                        properties:{
                            image: {
                                type: "string"
                              },
                        },
                        description: "A profile  image url", // desc
                    }
                }
            }
        },
        responses:{
            '201':{
                description: "Profile pics uploaded successfully"
            },
            '500':{
                description: 'Server error'
            }
        }
    }
}