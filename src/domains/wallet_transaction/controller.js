const WalletTransaction = require("./model");


const createWalletTransaction = async (userId,status,currency,amount) =>{
    try{
         // create wallet transaction
    const walletTransaction = await new WalletTransaction({
        amount,
        userId,
        isInflow: true,
        currency,
        status
      });
      await walletTransaction.save();
      console.log(walletTransaction, 'create walet trasnsaction');
      return walletTransaction;
    }catch(err){
        console.log(err);
         throw err;
    }
   
}
const getUserWalletTransaction = async ( userId ) => {
    try{
         console.log(userId)   
        // get user wallet transaction
        const transaction = await  WalletTransaction.findOne({userId})        
        return {
            transaction
        }
    }
    catch(err){
        throw err;
    }
}

const getAllWalletTransaction = async () => {
    try{
            
        // get all wallet transaction
        const transaction = await  WalletTransaction.find();        
        return {
            transaction
        }
    }
    catch(err){
        throw err;
    }
}


module.exports = {getAllWalletTransaction,getUserWalletTransaction,createWalletTransaction}