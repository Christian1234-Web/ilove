const Wallet = require("./model");



const createWallet = async (userId ) => {
try{   
    // create wallet
    const wallet = await new Wallet({
    userId
    });
    
    // save otp record
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
                balance:new Intl.NumberFormat('en-US').format(wallet.balance / 100),
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
      console.log('wallet udpate');
        throw error;
    }
  };


module.exports = {getAllWallet,getUserWallet,createWallet,updateWallet}