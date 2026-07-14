const mongoose = require('mongoose');

const NotificationLogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  message: { type: String, required: true },
  target: { type: String, required: true },// 'all', 'segment', etc.
  sentAt: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('NotificationLog', NotificationLogSchema);