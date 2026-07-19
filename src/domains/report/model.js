const mongoose = require('mongoose');

const ReportSchema = new mongoose.Schema({
  reporterId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  reportedUserId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  category: {
    type: String,
    enum: ['harassment', 'spam', 'inappropriate_content', 'other'],
    required: true
  },
  description: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['open', 'resolved', 'dismissed'], // Added 'dismissed' to handle false alarms cleanly
    default: 'open'
  },
  actionTaken: {
    type: String,
    enum: ['none', 'ban', 'unban', 'mute', 'strip_assets', 'demote_verification'],
    default: 'none' // Track what administrative adjustment was actually applied
  },
  resolution: {
    type: String,
    default: '' // Renamed to match the `resolution` property updated in your controller
  }
}, { timestamps: true });

module.exports = mongoose.model('Report', ReportSchema);