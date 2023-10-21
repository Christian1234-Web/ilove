const WalletTransaction = require("./model");


const createWalletTransaction = async (userId,status,currency,amount) =>{
    try{
         // create wallet transaction
    const walletTransaction =  new WalletTransaction({
        amount,
        userId,
        isInflow: true,
        currency,
        status
      });
      await walletTransaction.save();
      return walletTransaction;
    }catch(err){
        console.log(err);
         throw err;
    }
   
}
const getUserWalletTransaction = async ( userId ) => {
    try{
        // get user wallet transaction
        const transactions = await  WalletTransaction.find({userId})        
        return {
            transactions
        }
    }
    catch(err){
        throw err;
    }
}

const getAllWalletTransaction = async () => {
    try{
            
        // get all wallet transaction
        const transactions = await  WalletTransaction.find();        
        return {
            transactions
        }
    }
    catch(err){
        throw err;
    }
}


module.exports = {getAllWalletTransaction,getUserWalletTransaction,createWalletTransaction}