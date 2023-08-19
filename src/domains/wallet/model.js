const mongoose = require("mongoose");

const WalletSchema = new mongoose.Schema({
    balance: { type: Number, default: 0 },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "users",
    },
  },

{ timestamps: true }
);


const Wallet = mongoose.model("Wallet", WalletSchema);

module.exports = Wallet;