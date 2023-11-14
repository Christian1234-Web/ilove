const Wallet = require("./model");

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

module.exports = { updateWallet };
