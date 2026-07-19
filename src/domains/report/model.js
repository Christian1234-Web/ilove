const mongoose = require('mongoose');

const ReportSchema = new mongoose.Schema({
  reporterId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  reportedUserId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  category: { type: String, enum: ['harassment', 'spam', 'inappropriate_content', 'other'], required: true },
  description: { type: String, required: true },
  status: { type: String, enum: ['open', 'resolved'], default: 'open' },
  resolutionNotes: { type: String, default: '' }
}, { timestamps: true });

module.exports = mongoose.model('Report', ReportSchema);