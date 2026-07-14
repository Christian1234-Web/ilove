const mongoose = require('mongoose');

const BankSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  code: { type: String, required: true }, // Paystack/Monnify bank code
  active: { type: Boolean, default: true } //[cite: 1]
}, { timestamps: true });

module.exports = mongoose.model('Bank', BankSchema);