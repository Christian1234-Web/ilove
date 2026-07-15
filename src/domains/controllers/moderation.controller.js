const { PostImage: Photo } = require('../upload_image/model');
const UserReport = require('../userReport/model');
const AuditLog = require('../auditLog/model');
const mongoose = require('mongoose');
const User = require('../user/model');

// 7.1 GET /admin/moderation/photos
exports.getFlaggedPhotos = async (req, res, next) => {
  try {
    // Retrieve photos awaiting review or flagged by automated rules
    const flaggedPhotos = await Photo.find({ status: 'flagged' })
      .sort({ createdAt: -1 });

    const formattedPhotos = flaggedPhotos.map(photo => ({
      _id: photo._id,
      image: photo.url, // maps to image asset string field
      userId: photo.userId,
      createdAt: photo.createdAt,
      status: photo.status
    }));

    return res.status(200).json({
      status: "success",
      data: formattedPhotos
    });
  } catch (error) {
    next(error);
  }
};

// 7.2 POST /admin/moderation/photos/moderate
exports.moderatePhoto = async (req, res, next) => {
  try {
    const { photoId, action } = req.body; // action: "removed" | "approved"

    if (!['approved', 'removed'].includes(action)) {
      return res.status(400).json({ status: 'error', message: 'Invalid moderation action parameter.' });
    }

    // Map frontend actions to underlying database status flags
    const databaseStatus = action === 'approved' ? 'active' : 'removed';

    const photo = await Photo.findByIdAndUpdate(
      photoId,
      { $set: { status: databaseStatus } },
      { new: true }
    );

    if (!photo) {
      return res.status(404).json({ status: 'error', message: 'Target photo record not found.' });
    }
    
    // Record the moderator operation into your audit trails[cite: 1]
    await AuditLog.create({
      adminName: req.adminUser.username || "administration", // Pulled from your JWT verification middleware[cite: 1]
      action: `photo.${action}`,
      details: `Moderator reviewed photo item ${photoId} and set status to ${action}.`
    });
    return res.status(200).json({
      status: "success",
      message: "Moderation action recorded successfully"
    });
  } catch (error) {
    next(error);
  }
};

// 7.3 GET /admin/moderation/reports
exports.getUserReports = async (req, res, next) => {
  try {
    // Fetch open user report tickets
    const reports = await UserReport.find({ status: 'open' })
      .sort({ createdAt: -1 });

    const formattedReports = reports.map(rpt => ({
      _id: rpt._id,
      reporterId: rpt.reporterId,
      reportedUserId: rpt.reportedUserId,
      category: rpt.category,
      description: rpt.description,
      status: rpt.status,
      createdAt: rpt.createdAt
    }));

    return res.status(200).json({
      status: "success",
      data: formattedReports
    });
  } catch (error) {
    next(error);
  }
};

// 7.4 POST /admin/moderation/reports/resolve
exports.resolveUserReport = async (req, res, next) => {
  try {
    const { reportId, resolution, status } = req.body; // status: 'resolved' | 'dismissed'[cite: 1]

    if (status === 'resolved' && !resolution) {
      return res.status(400).json({ status: 'error', message: 'Resolution details are required to close a ticket.' });
    }

    const updatedReport = await UserReport.findByIdAndUpdate(
      reportId,
      { status, resolution },
      { new: true, runValidators: true }
    );

    if (!updatedReport) {
      return res.status(404).json({ status: 'error', message: 'Report ticket not found.' });
    }

    // Automatically create an entry in the System Audit Log[cite: 1]
    await AuditLog.create({
      adminId: req.adminUser._id || req.adminUser.id, // Must match schema type (ObjectId)
      adminName: req.adminUser.username || "administration", // Pulled from your JWT verification middleware[cite: 1]
      action: 'report.resolve',
      targetId: reportId,                            // Required by schema (ObjectId)
      targetType: 'UserReport',                      // Required by schema  
      ipAddress: req.ip || req.headers['x-forwarded-for'] || 'unknown', // Capture the moderator's IP address
      details: `Report ${reportId} was marked as ${status}. Resolution: ${resolution || 'None'}`
    });
    

    return res.status(200).json({
      status: 'success',
      message: 'Abuse ticket status updated successfully',
      data: updatedReport
    });
  } catch (error) {
    next(error);
  }
};


// GET /admin/reports/export?type=user_growth&range=30_days&format=csv[cite: 1]
exports.exportReportData = async (req, res, next) => {
  try {
    const { type, range, format } = req.query;

    if (format !== 'csv') {
      return res.status(400).json({ status: 'error', message: 'PDF export requires alternate engines. Use format=csv for streaming.' });
    }

    // Set standard response headers to trigger an immediate browser file attachment download
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', `attachment; filename=report_${type}_${range}.csv`);

    // 1. Write the initial CSV Header row line
    res.write('ID,Username,Email,Phone,Active,JoinedDate\n');

    // 2. Fetch a Data Cursor stream from MongoDB instead of loading all objects with .find()
    const userCursor = User.find()
      .select('_id username email phone active createdAt')
      .cursor();

    // 3. Process records one by one as they pipe out of the database cluster
    userCursor.on('data', (user) => {
      const csvRow = `"${user._id}","${user.username}","${user.email}","${user.phone}",${user.active},"${user.createdAt.toISOString()}"\n`;
      res.write(csvRow);
    });

    // 4. Safely terminate the connection channel once the collection runs dry
    userCursor.on('end', () => {
      res.end();
    });

    userCursor.on('error', (err) => {
      next(err);
    });

  } catch (error) {
    next(error);
  }
};

// create report 
/**
 * @desc    Submit a new abuse/harassment report against another user
 * @route   POST /api/moderation/reports/create
 * @access  Private (Authenticated User)
 */
exports.createUserReport = async (req, res, next) => {
  const { reportedUserId, category, description, reporterId } = req.body;
  // const reporterId = req.user.id; // Directly injected by protectUser middleware

  try {
    // 1. Basic payload validations
    if (!reportedUserId) {
      return res.status(400).json({ status: 'error', message: 'Target reported user ID is required.' });
    }

    if (!category || !['harassment', 'spam', 'inappropriate_content', 'other'].includes(category)) {
      return res.status(400).json({ 
        status: 'error', 
        message: 'Invalid report category. Must be: harassment, spam, inappropriate_content, or other.' 
      });
    }

    if (!description || description.trim().length < 5) {
      return res.status(400).json({ 
        status: 'error', 
        message: 'A detailed description (minimum 5 characters) is required.' 
      });
    }

    // 2. Prevent users from reporting themselves
    if (reporterId === reportedUserId) {
      return res.status(400).json({ status: 'error', message: 'You cannot file a report against yourself.' });
    }

    // 3. Verify the target reported user exists in the system
    const targetUser = await User.findById(reportedUserId);
    if (!targetUser) {
      return res.status(404).json({ status: 'error', message: 'The reported user does not exist.' });
    }

    // 4. Create the open report ticket
    const newReport = await UserReport.create({
      reporterId,
      reportedUserId,
      category,
      description,
      status: 'open'
    });

    return res.status(201).json({
      status: 'success',
      message: 'Report submitted successfully. Administrators have been notified.',
      data: newReport
    });

  } catch (error) {
    next(error);
  }
};