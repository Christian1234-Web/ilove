const mongoose = require('mongoose');

const InterestSchema = new mongoose.Schema({
  title: { type: String, required: true, unique: true }
}, { timestamps: true });

module.exports = mongoose.model('Interest', InterestSchema);