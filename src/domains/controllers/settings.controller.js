const AdminUser = require('../adminUser/model');
const AuditLog = require('../auditLog/model');

// 1. GET /admin/settings/admins[cite: 1]
exports.getAdminAccountsList = async (req, res, next) => {
  try {
    const administrators = await AdminUser.find({}, '-password').sort({ role: 1 });
    return res.status(200).json({ status: 'success', data: administrators });
  } catch (error) {
    next(error);
  }
};

// 2. GET /admin/settings/audit-logs[cite: 1]
exports.getAuditTrailHistory = async (req, res, next) => {
  try {
    // Pull the chronological historical trace logs of operations[cite: 1]
    const logs = await AuditLog.find()
      .sort({ createdAt: -1 }) // Newest log events first
      .limit(200); // Caps lookbacks for response speed optimization

    return res.status(200).json({
      status: 'success',
      data: logs
    });
  } catch (error) {
    next(error);
  }
};