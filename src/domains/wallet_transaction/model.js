const mongoose = require("mongoose");

const walletTransactionSchema = new mongoose.Schema(
  {
    amount: { type: Number, default: 0 },

    // Even though user can be implied from wallet, let us
    // double save it for security
    userId: {
      type: String,
      ref: "User",
      required: true,
    },

    isInflow: { type: Boolean },

    paymentMethod: {
       type: String,
       required: [true, "payment method is required"],
       enum: ["flutterwave","paystack"], // Payment gateway might differs as the application grows
       },

    currency: {
      type: String,
      required: [true, "currency is required"],
      enum: ["NGN", "USD", "EUR", "GBP"],
    },

    status: {
      type: String,
      required: [true, "payment status is required"], 
      enum: ["successful", "pending", "failed","withhold"],
    },
  },
  { timestamp: true }
);

module.exports = mongoose.model("walletTransaction", walletTransactionSchema);