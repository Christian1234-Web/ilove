// wallet
const getWallet = require('../wallet/get-wallet');
const createWallet = require('../wallet/create-wallet');
fundWalletByWallet = require('../wallet/fund-wallet-by-wallet');
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
const findUserByUsername = require("../user/find-user-by-name");
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
const disapprovePendingTransaction = require('../transaction/approve-or-disapprove-transaction');
const approvePendingTransaction = require('../transaction/approve-or-disapprove-transaction');

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
const createImagePost = require('../image/create-image-post');
const getImagePosted = require('../image/get-image-posted');
const deletePost = require('../image/delete-post');
const createChat = require('../chat/create-chat');
const getUserChat = require('../chat/get-user-chat');
const getRecentInteraction  = require('../chat/get-recent-interaction');
const getUserOneTwo = require('../chat/get-user-one-two');
const createMessage = require('../message/create-message');
const getUserOneTwoMsg = require('../message/get-user-one-two-msg');
const sendRequest = require('../friend-request/send-request');
const getSentRequest = require('../friend-request/get-sent-request');
const getReceiveRequest = require('../friend-request/get-receive-request');
const acceptRequest = require('../friend-request/accept-request');
const rejectRequest = require('../friend-request/reject-request');
const deleteUser = require('../user/delete-user');
const blockUser = require('../block-unblock-user/block-user');
const unblockUser = require('../block-unblock-user/unblock-user');
const sendRuntimeMessage = require('../runtime-message/send-runtime-message');
const getRuntimeMessage = require('../runtime-message/get-runtime-message');
const addOnlineUser = require('../runtime-message/add-online-user');
const disconnectScoket = require('../runtime-message/disconnect-scoket');
const getOnlineUsers = require('../runtime-message/get-online-users');
const getRuntimeNotification = require('../runtime-message/get-notification');


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
        '/wallet/credit-another-user-wallet':{
            ...fundWalletByWallet
        },
        // user 
        '/user/all':{
            ...getUser,
        },
        '/user/find/{username}': {
            ...findUserByUsername
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
        '/user/delete/{id}':{
            ...deleteUser
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
        '/transaction/pending/approve':{
            ...approvePendingTransaction,
        },
        '/transaction/pending/disapprove':{
            ...disapprovePendingTransaction,
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
        '/paystack/verify/{ref}/{userId}':{
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
        //post image
        '/upload/post/{id}':{
            ...createImagePost,
        },
        '/upload/get/post/{id}':{
            ...getImagePosted,
        },
        '/upload/post/delete/{id}':{
            ...deletePost,
        },
        //chat
        "/chat/new":{
            ...createChat
        },
        '/chat/user/{userId}':{
            ...getUserChat,
        },
        '/chat/recent/{userId}':{
            ...getRecentInteraction ,
        },
        '/chat/find/{firstId}/{secondId}':{
            ...getUserOneTwo,
        },
          //message
          "/message/new":{
            ...createMessage
        },
        '/message/chat/{chatId}':{
            ...getUserOneTwoMsg,
        },
        
        // runtime messages with socket.io
        "/send-message-on-runtime":{
            ...sendRuntimeMessage
        },
        "/get-message-on-runtime":{
            ...getRuntimeMessage
        },
        "/add-online-users-on-runtime":{
            ...addOnlineUser
        },
        "/disconnet-from-socket-runtime":{
            ...disconnectScoket
        },
        "/get-online-users-on-runtime":{
            ...getOnlineUsers
        },
        "/get-notification-on-runtime":{
            ...getRuntimeNotification
        },
         //friend request
         "/friend-request/send":{
            ...sendRequest,
        },
        '/friend-request/sent/{userId}':{
            ...getSentRequest,
        },
        '/friend-request/receive/{userId}':{
            ...getReceiveRequest,
        },
        "/friend-request/accept":{
            ...acceptRequest,
        },
        "/friend-request/reject":{
            ...rejectRequest,
        },
        // block and unblock user
        "/user/block":{
            ...blockUser,
        },
        "/user/unblock":{
            ...unblockUser,
        },
    }
}
