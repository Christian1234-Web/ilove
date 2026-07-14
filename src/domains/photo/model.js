const mongoose = require('mongoose');

const PhotoSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, //[cite: 1]
  image: { type: String, required: true }, // URL to cloud storage[cite: 1]
  status: { 
    type: String, 
    enum: ['pending', 'approved', 'flagged', 'removed'], 
    default: 'pending' 
  },//[cite: 1]
  flaggedReason: { type: String, default: '' } // populated by PhotoDNA or automated AI rules[cite: 1]
}, { timestamps: true });

module.exports = mongoose.model('Photo', PhotoSchema);