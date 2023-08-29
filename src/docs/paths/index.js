// wallet
const getWallet = require('../wallet/get-wallet');
const createWallet = require('../wallet/create-wallet');
// interest
const createInterest = require('../interest/create-interest');
const getInterest = require('../interest/get-interest');
// user
const getUserWaller = require("../wallet/get-user-wallet");
const getSingleUser = require('../user/get-single-user');
const updateUser = require('../user/update-user');
const forgetPassword = require('../user/forget-password');
const addInterest = require('../interest/add-interest');
const removeInterest = require('../interest/remove-interest');
const updateInterest = require('../interest/update-interest');
const getUser = require('../user/get-users');
const createUser = require('../user/create-user');
const signinUser = require('../user/user-signin');
// email and phone verification
const resendMail = require('../email-verification/resend-mail');
const verifyEmail = require('../email-verification/verify-email');
const phoneRequest = require('../phone-verification/phone-request');
const verifyPhone = require('../phone-verification/verify-phone');
// wallet transaction
const getWalletTransaction = require('../wallet-transaction/get-wallet-transaction');
const getUserWalletTransaction = require('../wallet-transaction/get-user-wallet-transaction');
// transaction
const getSingleTransaction = require('../transaction/get-single-transaction');
const getAllTransaction = require('../transaction/get-all-transaction');
// flutterwave
const verifyPayment = require('../flutterwave/verify-payment');
const withdraw = require('../flutterwave/withdraw');
const getAllBanks = require('../flutterwave/get-all-banks');
// paystack
const paystackVerifyPayment = require("../paystack/verify-payment");
const updatePassword = require('../user/update-password');
const uploadProfile = require('../image/upload-profile');
const uploadCover = require('../image/upload-cover');
const getProfile = require('../image/get-profile');
const getCover = require('../image/get-cover');
const createChat = require('../chat/create-chat');
const getUserChat = require('../chat/get-user-chat');
const getUserOneTwo = require('../chat/get-user-one-two');


// module
module.exports = {
    paths:{
        //wallet
        '/wallet/all':{
            ...getWallet,
        },
        '/wallet/new':{
            ...createWallet
        },
        '/wallet/user/{id}':{
            ...getUserWaller
        },
        // user 
        '/user/all':{
            ...getUser,
            // ...createTodo
        },
        '/user/single/{id}':{
            ...getSingleUser
        },
        '/user/signup':{
            ...createUser,
        },
        '/user/signin':{
            ...signinUser,
        },
        '/user/forget-password':{
            ...forgetPassword,
        },
        '/user/update/{id}':{
            ...updateUser
        },
        '/user/update-password' : {
            ...updatePassword
        },
        // interest
        '/interest/all':{
            ...getInterest,
        },
        '/interest/new':{
            ...createInterest,
            // ...createInterest
        },
        '/interest/add':{
            ...addInterest,
        },
        '/interest/remove':{
            ...removeInterest,
        },
        '/interest/update/{id}':{
            ...updateInterest
        },
        // email verification
        '/email/resend-otp':{
            ...resendMail,
        },
        '/email/verify-otp':{
            ...verifyEmail,
        },
        // phone number verification
        '/phone/send-otp':{
            ...phoneRequest,
        },
        '/phone/verify-otp':{
            ...verifyPhone,
        },
        // wallet transaction
        '/wallet-transaction/all':{
            ...getWalletTransaction,
        },
        '/wallet-transaction/user/{id}':{
            ...getUserWalletTransaction,
        },
         // transaction
         '/transaction/all':{
            ...getAllTransaction,
        },
        '/transaction/single/{transactionId}':{
            ...getSingleTransaction,
        },
        //flutterwave
        '/flutterwave/verify':{
            ...verifyPayment,
        },
        '/flutterwave/withdraw':{
            ...withdraw,
        },
        '/flutterwave/banks':{
            ...getAllBanks,
        },
        // paystack
        '/paystack/verify/{ref}':{
            ...paystackVerifyPayment,
        },
        // cover and profile pics
        '/upload/profile/{id}':{
            ...uploadProfile,
        },
        '/upload/cover/{id}':{
            ...uploadCover,
        },
        '/upload/profile/all':{
            ...getProfile,
        },
        '/upload/cover/all':{
            ...getCover,
        },
        //chat
        "/chat/new":{
            ...createChat
        },
        '/chat/user/{userId}':{
            ...getUserChat,
        },
        '/chat/find/{firstId}/{secondId}':{
            ...getUserOneTwo,
        },
    }
}
