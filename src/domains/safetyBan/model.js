const mongoose = require('mongoose');

const SafetyBanSchema = new mongoose.Schema({
  targetType: { type: String, enum: ['ip', 'hardware_uuid'], required: true },
  targetValue: { type: String, required: true, unique: true }, // Encrypted hardware ID or IP string
  reason: { type: String, required: true },
  bannedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'AdminUser' }
}, { timestamps: true });

module.exports = mongoose.model('SafetyBan', SafetyBanSchema);