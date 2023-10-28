const WalletTransaction = require("./model");


const createWalletTransaction = async (userId,status,currency,amount,paymentMethod) =>{
    try{
         // create wallet transaction
    const walletTransaction =  new WalletTransaction({
        amount,
        userId,
        isInflow: true,
        currency,
        status,
        paymentMethod
      });
      await walletTransaction.save();
      return walletTransaction;
    }catch(err){
         throw err;
    }
   
}
const getUserWalletTransaction = async ( userId ) => {
    try{
        // get user wallet transaction
        const transactions = await  WalletTransaction.find({userId})    
        const walletTransactions = transactions.map(e => {
            return{
                    _id:e._id,
                    amount:new Intl.NumberFormat('en-US').format(e.amount),
                    userId:e.userId,
                    isInflow:e.isInflow,
                    paymentMethod:e.paymentMethod,
                    currency:e.currency,
                    status:e.status,
                    __v:0
            }
        })  
        return {walletTransactions}
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