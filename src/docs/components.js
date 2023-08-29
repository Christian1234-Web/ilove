module.exports = {
    components: {
      schemas: {
        // id model
        id: {
            type: "string", // data type
            description: "An id", // desc
            example: "64d0f745b57d80d91f3aa3e0", // example of an id
          },
          // file
          file: {
            type: "file", // data type
            description: "a  image", // desc
            required: true
          },
    // email model
    email: {
        type: "object", // data type
        properties: {
            email:{
                type: "string", // data type
                description: "email of user", // desc
                example: "chris@gmail.com",
            }
     }
    },
    //User model
     User: {
        type: "object", // data type
        properties: {
          username: {
              type: "string", // data-type
              description: "user name", // desc
              example: "12121", // example of an id
              require
            },
            email: {
                type: "string", // data-type
                description: "user email", // desc
                example: "chris@gmail.com", // example of an id
                require
              },
              
              phone: {
                type: "string", // data-type
                description: "user phone number", // desc
                example: "12121", // example of an id
                require
              },
              address: {
                type: "string", // data-type
                description: "user address", // desc
                example: "new city", // example of an id
                require
              },
              bio: {
                type: "string", // data-type
              },
              profession: {
                type: "string", // data-type
              }
        },
      },
        // update user passsword
        UpdatePassword: {
          type: "object", // data type
            properties: {
              userId: {
                type: "string", // data-type
                description: "user identification number", // desc
                example: "77676544334", // example of an id
              },
              password: {
                  type: "string", // data-type
                  description: "user password", // desc
                  example: "12121", // example of an id
                },
            },
        }, 
        //signup user
      Signup: {
          type: "object", // data type
          properties: {
            username: {
                type: "string", // data-type
                description: "user name", // desc
                example: "12121", // example of an id
                require
              },
              email: {
                  type: "string", // data-type
                  description: "user email", // desc
                  example: "chris@gmail.com", // example of an id
                  require
                },
                
                phone: {
                  type: "number", // data-type
                  description: "user phone number", // desc
                  example: "12121", // example of an id
                  require
                },
                address: {
                  type: "string", // data-type
                  description: "user address", // desc
                  example: "new city", // example of an id
                  require
                },
                password: {
                  type: "string", // data-type
                  description: "user password", // desc
                  example: "12121", // example of an id
                  require
                },
          },
        },
      // signin user
      SiginUser: {
        type: "object", // data type
        properties: {
          username: {
              type: "string", // data-type
              description: "user name", // desc
              example: "chris123", // example of an username
              require
            },
              password: {
                type: "string", // data-type
                description: "user password", // desc
                example: "12121", // example of an password
                require
              },
        },
      },
        // wallet model
        Wallet: {
          type: "object", // data type
          properties: {
            id: {
              type: "string", // data-type
              description: "wallet identification number", // desc
              example: "77676544334", // example of an id
            },
            user: {
                type: "string", // data-type
                description: "user identification number", // desc
                example: "12121", // example of an id
              },
            balance: {
              type: "number", // data-type
              description: "user balance", // desc
              example: "2000", // example of a title
            }
          },
        },
        // interest  model
        Interest: {
          type: "object", // data type
          properties: {
            title: {
              type: "string", // data type
              description: "interest title", // desc
              example: "Music", // example of a title
            },
            user: {
              type: "string", // data type
              description: "user id", // desc
              example: "12234", // example of a completed value
            },
          },
        },
        // add interest
        AddInterest: {
            type: "object", // data type
            properties: {
              userId: {
                type: "string", // data type
                description: "user id", // desc
                example: "64d0f745b57d80d91f3aa3e0", // example of a title
              },
              interestId: {
                type: "string", // data type
                description: "interest id", // desc
                example: "12234", // example of a completed value
              },
            },
          },
          // update interest
          UpdateInterest: {
            type: "object", // data type
            properties: {
              title: {
                type: "string", // data type
                description: "interest title", // desc
                example: "Music", // example of a title
              }
            },
          },
          // resend mail
          ResendMail:{
            type: "object", // data type
            properties: {
              userId: {
                type: "string", // data type
                description: "user id", // desc
                example: "12345677", // example of a id
              },
              email: {
                type: "string", // data type
                description: "user email", // desc
                example: "email@gmail.com", // example of a example
              }
            },
          },
           // verify mail
           VerifyEmail:{
            type: "object", // data type
            properties: {
              userId: {
                type: "string", // data type
                description: "user id", // desc
                example: "1234567aswssaa7", // example of a id
              },
              otp: {
                type: "string", // data type
                description: "otp code", // desc
                example: "123456", // example of a example
              }
            },
          },
          // send phone otp
          RequestPhoneOtp:{
            type: "object", // data type
            properties: {
              userId: {
                type: "string", // data type
                description: "user id", // desc
                example: "1234567aswssaa7", // example of a id
              }
            },
          },
          // send phone otp
          VerifyPhoneOtp:{
            type: "object", // data type
            properties: {
              userId: {
                type: "string", // data type
                description: "user id", // desc
                example: "1234567aswssaa7", // example of a id
              },
              otp: {
                type: "string", // data type
                description: "otp code", // desc
                example: "123456", // example of a example
              }
            },
          },
          // verify flutterwave payment
          VerifyFlutterwavePayment:{
            type: "object", // data type
            properties: {
              userId: {
                type: "string", // data type
                description: "user id", // desc
                example: "1234567aswssaa7", // example of a id
              },
              otp: {
                type: "string", // data type
                description: "otp code", // desc
                example: "12345", // example of a example
              },
              flw_ref: {
                type: "string",
                description: "reference code",
                example:"SADSSFNDFDHDD"
              }
            },
          },
          //withdraw from flutterwave
          WithdrawFromFlutterwave:{
            type: "object", // data type
            properties: {
              account_bank: {
                type: "string", // data type
                description: "user bank account", // desc
                example: "13434343", // example of a id
              },
              account_number: {
                type: "string", // data type
                description: "user account number", // desc
                example: "12345", // example of a example
              },
              amount: {
                type: "string",
                description: "amount to withdraw",
                example:"100000"
              },
              currency: {
                type: "string",
                description: "currency",
                example:"NGN"
              },
              beneficiary_name: {
                type: "string",
                description: "beneficiary name",
                example:"chris"
              },
            },
          },
        // error model
        Error: {
          type: "object", //data type
          properties: {
            message: {
              type: "string", // data type
              description: "Error message", // desc
              example: "Not found", // example of an error message
            },
            internal_code: {
              type: "string", // data type
              description: "Error internal code", // desc
              example: "Invalid parameters", // example of an error internal code
            },
          },
        },
      },
    },
  };