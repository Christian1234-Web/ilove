const mongoose = require('mongoose');

const VerificationRequestSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, enum: ['face', 'kyc', 'email'], required: true },  //[cite: 1]
  status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' }, //[cite: 1]
  evidence: { type: String, required: true }, // URL to photo or document verification frame
  reason: { type: String, default: '' } // Required if verification fails
}, { timestamps: true });

module.exports = mongoose.model('VerificationRequest', VerificationRequestSchema);