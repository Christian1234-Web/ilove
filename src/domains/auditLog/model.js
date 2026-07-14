const mongoose = require('mongoose');

const AuditLogSchema = new mongoose.Schema({
  adminId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'AdminUser', 
    required: true 
  },
  action: { 
    type: String, 
    required: true // e.g., "SUSPEND_USER", "APPROVE_WITHDRAWAL", "RESOLVE_REPORT"
  },
  targetType: { 
    type: String, 
    required: true // e.g., "User", "Transaction", "UserReport"
  },
  targetId: { 
    type: mongoose.Schema.Types.ObjectId, 
    required: true 
  },
  ipAddress: { 
    type: String, 
    default: '' 
  },
  details: { 
    type: String, 
    default: '' // Descriptive note on what changed
  }
}, { timestamps: true });

module.exports = mongoose.model('AuditLog', AuditLogSchema);