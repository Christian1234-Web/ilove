const Transaction = require("./model");



const createTransaction = async (
    userId,
    id,
    status,
    currency,
    amount,
    name,
    email,
    phone
    ) => {
        try{
            // create transaction
            const transaction = await new Transaction({
                userId,
                transactionId: id,
                name,
                email,
                phone,
                amount,
                currency,
                paymentStatus: status,
                paymentGateway: "flutterwave",
            });
            transaction.save();
            return transaction;
        }catch(err){
            console.log('transaction')
            throw err;
        }
     
}
const getSingleTransaction = async ( transactionId ) => {
    try{
        // get single transaction 
        const transaction = await  Transaction.findOne({transactionId}); 
        return transaction;
    }
    catch(err){
        throw err;
    }
}

const getAllTransaction = async () => {
    try{
        // get all transaction
        const transaction = await Transaction.find();        
        return {
            transaction
        }
    }
    catch(err){
        throw err;
    }
}


module.exports = {getAllTransaction,getSingleTransaction,createTransaction}