const mongoose = require("mongoose");

const pendingTransactionSchema = new mongoose.Schema(
  {
    senderId: {
      type: String,
      required: [true, "senderId is required"],
    },
    receiverId: {
      type: String,
      required: [true, "receiverId is required"],
    },
    senderWalletTransactionId: {
      type: String,
      required: [true, "senderWalletTransactionId is required"],
    },
    receiverWalletTransactionId: {
      type: String,
      required: [true, "receiverWalletTransactionId is required"],
    },
    amount: {
      type: String,
      required: [true, "amount is required"],
    },
    isApproveBySender: {
      type: Boolean,
      default: null
    },
    isApproveByReceiver: {
      type: Boolean,
      default: null
    },
    currency: {
      type: String,
      required: [true, "currency is required"],
      enum: ["NGN", "USD", "EUR", "GBP"],
      default: "NGN"

    },
    
    paymentStatus: {
      type: String,
      default: "pending"
    },
    paymentGateway: {
      type: String,
      required: [true, "payment gateway is required"],
      enum: ["flutterwave","paystack"],
      default: "paystack" 
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("PendingTransaction", pendingTransactionSchema);

