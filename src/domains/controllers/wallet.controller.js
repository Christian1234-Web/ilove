//admin

const Wallet = require('../wallet/model');
const mongoose = require('mongoose');

// 1. GET /admin/wallet/all[cite: 1]
exports.getAllWallets = async (req, res, next) => {
  try {
    const wallets = await Wallet.find().populate('userId', 'username email');
    return res.status(200).json({ status: 'success', data: wallets });
  } catch (error) {
    next(error);
  }
};

// 2. POST /admin/wallet/adjust[cite: 1]
exports.adjustWalletBalance = async (req, res, next) => {
  // const session = await mongoose.startSession();
  // session.startTransaction();
  
  try {
    const { walletId, amount, direction } = req.body;
    const parsedAmount = parseFloat(amount);
    
    // Determine the numeric modifier based on credit/debit direction[cite: 1]
    const modifier = direction === 'credit' ? parsedAmount : -parsedAmount;

    const updatedWallet = await Wallet.findByIdAndUpdate(
      walletId,
      { $inc: { balance: modifier } },
      { new: true, runValidators: true,  } // session immediately after true
    );

    if (!updatedWallet) {
      // await session.abortTransaction();
      return res.status(404).json({ status: 'error', message: 'Wallet not found' });
    }

    // TODO: Log this change to the Admin Audit Logs collection here[cite: 1]

    // await session.commitTransaction();
    // session.endSession();

    return res.status(200).json({
      status: 'success',
      message: 'Wallet balance successfully adjusted',
      data: { walletId: updatedWallet._id, newBalance: updatedWallet.balance.toString() }
    });
  } catch (error) {
    // await session.abortTransaction();
    // session.endSession();
    next(error);
  }
};

// 3. PUT /admin/wallet/freeze/:id[cite: 1]
exports.toggleWalletFreeze = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { frozen } = req.body;

    const updatedWallet = await Wallet.findByIdAndUpdate(
      id,
      { frozen },
      { new: true }
    );

    return res.status(200).json({
      status: 'success',
      message: 'Wallet status successfully updated',
      data: updatedWallet
    });
  } catch (error) {
    next(error);
  }
};