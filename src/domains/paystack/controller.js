const axios = require("axios");
const User = require("../user/model");
const { createWalletTransaction } = require("../wallet_transaction/controller");
const { getSingleTransaction, createTransaction } = require("../transaction/controller");
const { updateWallet } = require("../wallet/controller");



// Initialize the paystack class

const fundWallet = async ({userId,amount,currency,card_number,cvv,expiry_month,expiry_year,pin}) => {

    try {
        const user = await User.findOne({_id:userId});
        if(!user) {
            throw Error("User not found");
        }
  
        let handler = PaystackPop.setup({
            key: 'pk_test_xxxxxxxxxx', // Replace with your public key
            email: document.getElementById("email-address").value,
            amount: document.getElementById("amount").value * 100,
            ref: ''+Math.floor((Math.random() * 1000000000) + 1), // generates a pseudo-unique reference. Please replace with a reference you generated. Or remove the line entirely so our API will generate one for you
            // label: "Optional string that replaces customer email"
            onClose: function(){
              alert('Window closed.');
            },
            callback: function(response){
              let message = 'Payment complete! Reference: ' + response.reference;
              alert(message);
            }
          });
          handler.openIframe();
    } catch (err) {
        console.log(err);
       throw err;
    }
}
// verify payment

const verifyPayment = async (reference,userId) => {
    try{
      const user = await User.findOne({_id:userId});
      if(!user) {
          throw Error("User not found");
      }
      const url = `https://api.paystack.co/transaction/verify/${reference}`
      const res = await axios.get(url, {
        headers:{
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`
        }
      });
      if(res.data.status === true){
        const amount = res.data.data.amount / 100;

        // check if transaction id already exist
        const transactionExist = await getSingleTransaction(res.data.data.id);
    if (transactionExist) {
       throw  Error("Transaction Already Exist");
    }
    // create wallet transaction
     await createWalletTransaction(user._id, res.data.status === true ? 'successful':"failed", res.data.data.currency, amount,'paystack');
    // create transaction
     await createTransaction(user._id, res.data.data.id, res.data.status === true ? 'successful':"failed", res.data.data.currency, amount, user.username,user.email,user.phone,'paystack');

     // update user wallet 
    await updateWallet(user._id, amount);
        return {
          reference: res.data.data.reference
        }
      }else{
        throw Error(res.data.data.message)
      }
    }catch(err){
      throw err;
    }
}

const withdrawFromWallet = async ({userId,account_bank,account_number,amount, currency = "NGN"}) => {
    try{
      const user = await User.findOne({_id:userId});

    // For making Transfers to bank
    const data = {
      account_bank,
      account_number,
      amount,
      currency,
      beneficiary_name:user.username
    }
    const response = await axios.post('https://api.flutterwave.com/v3/transfers',data, {
      headers:{
        Authorization: `Bearer FLWSECK_TEST-SANDBOXDEMOKEY-X`
      }
    });
    console.log(response)
    }catch(err){
        throw err;
    }
   
  
};

const getAllBank = async () => {
  try{
      const response = await axios.get('https://api.flutterwave.com/v3/banks/NG',{
        headers: {
          Authorization: 'Bearer ' + process.env.FLUTTERWAVE_V3_SECRET_KEY,
        }
      });
      return response.data.data;
      console.log(response)

  }catch(err){
    throw err;
  }
}

module.exports = {fundWallet,verifyPayment,withdrawFromWallet,getAllBank}