const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    transactionId: {
      type: Number,
      trim: true,
    },
    name: {
      type: String,
      required: [true, "name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "email is required"],
      trim: true,
    },
    phone: {
      type: String,
    },
    isInflow: { type: Boolean, default:null },

    amount: {
      type: String,
      required: [true, "amount is required"],
    },
    currency: {
      type: String,
      required: [true, "currency is required"],
      enum: ["NGN", "USD", "EUR", "GBP"],
    },
     type: {
      type: String,
      required: [true, "type is required"],
      enum: ["all", "ledger", "p2p", "withdrawals"],
      default:"all"
    },
    paymentStatus: {
      type: String,
      enum: ["successful", "pending", "failed"],
      default: "pending",
    },
    paymentGateway: {
      type: String,
      required: [true, "payment gateway is required"],
      enum: ["flutterwave","paystack"], // Payment gateway might differs as the application grows
    },
  },
  {
    timestamps: true,
  }
);



module.exports = mongoose.model("Transaction", transactionSchema);

