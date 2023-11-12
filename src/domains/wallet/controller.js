const { createWalletTransaction } = require("../wallet_transaction/controller");
const { createPendingTransaction } = require("../transaction/controller");
const Wallet = require("./model");



const createWallet = async (userId ) => {
try{   
    // create wallet
    const wallet =  new Wallet({
    userId
    });
    
    // save  wallet
    await wallet.save();
    return {
        wallet
    }
}
catch(err){
    throw err;
}
}

const getUserWallet = async ( userId ) => {
    try{
        // get user wallet
        const wallet = await  Wallet.findOne({userId})        
        return {
            wallet:{
                _id:wallet._id,
                balance:new Intl.NumberFormat('en-US').format(wallet.balance), 
                userId:wallet.userId,
                createdAt:wallet.createdAt,
                updatedAt:wallet.updatedAt,
                __v:0
            }
        }
    }
    catch(err){
        throw err;
    }
}

const getAllWallet = async () => {
    try{
            
        // get all wallet
        const wallet =  await Wallet.find()       
        return {
            wallet
        }
    }
    catch(err){
        throw err;
    }
}
const updateWallet = async (userId, amount) => {
    try {
      // update user wallet
      const wallet = await Wallet.findOneAndUpdate(
        { userId },
        { $inc: { balance: amount } },
        { new: true }
      );
      return wallet;
    } catch (error) {
        throw error;
    }
  };

const fundWalletByWallet = async (data) => {
   try{
    const {senderId,receiverId,amount}= data; 
    const intAmount = parseInt(amount);
    await updateWallet(senderId, -intAmount);
    const senderWalletTransaction = await createWalletTransaction(senderId,'pending','NGN',-intAmount,'paystack');
    const receiverWalletTransaction = await createWalletTransaction(receiverId,'pending','NGN',intAmount,'paystack');
    const pendingWalletTransaction = await createPendingTransaction(senderId,receiverId,amount,senderWalletTransaction._id,receiverWalletTransaction._id);
    return {pendingWalletTransaction}

   }catch(err){
    throw err;
   }
}  


module.exports = {updateWallet,getAllWallet,getUserWallet,createWallet,fundWalletByWallet}