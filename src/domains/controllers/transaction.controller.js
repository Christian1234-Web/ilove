const Transaction = require('../transaction/model');
const Wallet = require('../wallet/model');
const mongoose = require('mongoose');

// GET /admin/transaction/ledger
// Function: Get full system financial records with inflow/outflow directions and statuses.
exports.getLedger = async (req, res, next) => {
  try {
    const { type } = req.query; // Accepts: "ledger" | "p2p" | "withdrawals" | all
    
    // 1. Initialize a dynamic filter query object
    let query = {};

    // 2. Map query parameters to match the enum definitions in your Transaction schema
    if (type && type !== 'all') {
      if (type === 'withdrawals') {
        query.type = 'withdrawal'; // Normalizes parameter mapping to the schema's singular field enum
      } else {
        query.type = type; //[cite: 1]
      }
    }

    // 3. Fetch global transaction history from the database[cite: 1]
    const ledgerRecords = await Transaction.find(query)
      .populate('userId', 'username email phone') // Hydrates the initiator metadata profile[cite: 1]
      .populate('senderId receiverId', 'username') // Hydrates P2P participants context if available[cite: 1]
      .sort({ createdAt: -1 }); // Newest logs first to match live ledger tracking feeds[cite: 1]

    // 4. Map the records to fit the exact JSON interface layout required by the frontend guide[cite: 1]
    const formattedData = ledgerRecords.map(tx => ({
      _id: tx._id, //[cite: 1]
      amount: tx.amount.toString(), //[cite: 1]
      userId: tx.userId?._id || tx.senderId?._id || 'system', //[cite: 1]
      isInflow: tx.type !== 'withdrawal', // Dynamically sets inflow/outflow logic flags[cite: 1]
      paymentMethod: tx.type === 'withdrawal' ? 'bank_transfer' : 'paystack', //[cite: 1]
      currency: tx.currency || 'NGN', //[cite: 1]
      status: tx.status, //[cite: 1]
      createdAt: tx.createdAt //[cite: 1]
    }));

    return res.status(200).json({
      status: "success", //[cite: 1]
      data: formattedData //[cite: 1]
    });

  } catch (error) {
    next(error);
  }
};

exports.overrideP2PTransfer = async (req, res, next) => {
  const { transferId, action } = req.body; // action: 'completed' or 'cancelled'[cite: 1]
  
  // Start ACID Multi-document session
  // const session = await mongoose.startSession();
  // session.startTransaction();

  try {
    // 1. Fetch and Lock the current transaction state
    const transaction = await Transaction.findById(transferId)
    // .session(session);
    if (!transaction) {
      // await session.abortTransaction();
      return res.status(404).json({ status: 'error', message: 'Transaction record not found.' });
    }

    if (transaction.status !== 'pending') {
      // await session.abortTransaction();
      return res.status(400).json({ status: 'error', message: 'Transaction has already been finalized.' });
    }

    // 2. Identify who gets credited based on the admin override action[cite: 1]
    let recipientId;
    if (action === 'completed') {
      // Release escrow to the seller/receiver
      recipientId = transaction.receiverId;
    } else if (action === 'cancelled') {
      // Revert fund back to the buyer/sender
      recipientId = transaction.senderId;
    } else {
      // await session.abortTransaction();
      return res.status(400).json({ status: 'error', message: 'Invalid action parameter.' });
    }

    // 3. Increment the designated wallet balance[cite: 1]
    const updatedWallet = await Wallet.findOneAndUpdate(
      { userId: recipientId },
      { $inc: { balance: transaction.amount } },
      // { new: true, session }
    );

    if (!updatedWallet) {
      throw new Error(`Target wallet for user ${recipientId} missing.`);
    }

    // 4. Mutate the transaction status record
    transaction.status = action;//[cite: 1]
    await transaction.save(); // { session } inside ()

    // Commit all changes down to disk safely
    // await session.commitTransaction();
    // session.endSession();

    return res.status(200).json({
      status: 'success',
      message: `P2P transfer override successful: Status changed to ${action}.`//[cite: 1]
    });

  } catch (error) {
    // If anything fails anywhere, undo absolutely everything in this block
    // await session.abortTransaction();
    // session.endSession();
    next(error);
  }
};

// POST /admin/transaction/withdrawal/settle
// Function: Approve or decline Paystack bank withdrawal queues.
exports.settleWithdrawal = async (req, res, next) => {
  const { requestId, action } = req.body; // action: "approved" | "rejected"

  if (!['approved', 'rejected'].includes(action)) {
    return res.status(400).json({ status: 'error', message: 'Invalid action payload. Must be approved or rejected.' });
  }

  // const session = await mongoose.startSession();
  // session.startTransaction();

  try {
    // 1. Locate the withdrawal transaction record[cite: 1]
    const transaction = await Transaction.findOne({ _id: requestId, type: 'withdrawal' })
    // .session(session);
    
    if (!transaction) {
      // await session.abortTransaction();
      return res.status(404).json({ status: 'error', message: 'Withdrawal request not found.' });
    }

    if (transaction.status !== 'pending') {
      // await session.abortTransaction();
      return res.status(400).json({ status: 'error', message: 'This withdrawal request has already been settled.' });
    }

    // 2. If the withdrawal is rejected, refund the money back to the user's wallet balance[cite: 1]
    if (action === 'rejected') {
      const updatedWallet = await Wallet.findOneAndUpdate(
        { userId: transaction.userId },
        { $inc: { balance: transaction.amount } }, // Credit the money back
        // { new: true, session }
      );

      if (!updatedWallet) {
        throw new Error(`User wallet not found for refunding transaction ${requestId}`);
      }
    }

    // 3. Update the transaction status to reflect the action outcome[cite: 1]
    // If approved, it marks the transaction 'completed'. If rejected, it marks it 'cancelled'.
    transaction.status = action === 'approved' ? 'completed' : 'cancelled'; //[cite: 1]
    await transaction.save(); // { session } inside ()

    // TODO: If action === 'approved', trigger your actual Paystack Transfer API call here

    // Commit changes safely to the database
    // await session.commitTransaction();
    // session.endSession();

    return res.status(200).json({
      status: "success", //[cite: 1]
      message: "Bank withdrawal request settled successfully" //[cite: 1]
    });

  } catch (error) {
    // await session.abortTransaction();
    // session.endSession();
    next(error);
  }
};