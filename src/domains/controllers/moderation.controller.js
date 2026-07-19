const { PostImage: Photo } = require('../upload_image/model');
const Report = require('../report/model');
const AuditLog = require('../auditLog/model');
const mongoose = require('mongoose');
const User = require('../user/model');
const { sendOTPVerificationEmail } = require('../email_verification_otp/controller');
const sendMail = require('../../util/sendMail');

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
    const { photoId, action } = req.body; // action: "removed" | "approved" | flagged

    if (!['approved', 'removed', 'flagged'].includes(action)) {
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
    const reports = await Report.find({ status: 'open' })
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

exports.resolveUserReport = async (req, res, next) => {
  try {
    const { reportId, resolution, status, action } = req.body;
    // status: 'resolved' | 'dismissed'
    // action: 'none' | 'ban' | 'unban' | 'mute' | 'strip_assets' | undefined

    // 1. Enforce strict parameter validation rules
    if (status === 'resolved' && !resolution) {
      return res.status(400).json({
        status: 'error',
        message: 'Resolution details are required to close a ticket.'
      });
    }

    // Standardize incoming baseline action parameters
    const recordAction = action ? action : 'none';

    // 2. Locate and resolve the report record tracking history choices
    const updatedReport = await Report.findByIdAndUpdate(
      reportId,
      {
        status,
        resolution,
        actionTaken: recordAction
      },
      { new: true, runValidators: true }
    );

    if (!updatedReport) {
      return res.status(404).json({
        status: 'error',
        message: 'Report ticket not found.'
      });
    }

    let userActionDetails = '';
    let targetUser = null;

    // 3. Perform targeted disciplinary adjustments on the offending user document
    if (action && action !== 'none') {
      if (!updatedReport.reportedUserId) {
        return res.status(400).json({
          status: 'error',
          message: 'This report does not contain a valid target user ID.'
        });
      }

      let updatePayload = {};

      switch (action) {
        case 'ban':
          updatePayload = { $set: { isBan: true } };
          userActionDetails = ' | Target account suspended.';
          break;

        case 'unban':
          updatePayload = { $set: { isBan: false } };
          userActionDetails = ' | Target account access restored.';
          break;

        case 'mute':
          // Restricts user communication capabilities for a specific 24h window
          updatePayload = {
            $set: {
              isMuted: true,
              muteExpiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000)
            }
          };
          userActionDetails = ' | Target messaging access muted for 24 hours.';
          break;

        case 'strip_assets':
          // Resets violating media files back to system defaults
          updatePayload = {
            $set: {
              profilePic: null,
              bio: 'This biography bio layout was removed by system moderation.'
            }
          };
          userActionDetails = ' | Target profile media files cleared.';
          break;

        default:
          return res.status(400).json({
            status: 'error',
            message: `Disciplinary action "${action}" is not supported.`
          });
      }

      // Execute calculated structural adjustments on the specific database record
      targetUser = await User.findByIdAndUpdate(
        updatedReport.reportedUserId,
        updatePayload,
        { new: true }
      );

      if (!targetUser) {
        return res.status(404).json({
          status: 'error',
          message: 'The user targeted by this report could not be found.'
        });
      }

      userActionDetails = ` | Target User: ${targetUser.username}${userActionDetails}`;

    }

    // 4. Record chronological logging details into systemic Audit trails
    await AuditLog.create({
      adminId: req.adminUser._id || req.adminUser.id,
      adminName: req.adminUser.username || "administration",
      action: action && action !== 'none' ? `report.${action}` : 'report.resolve',
      targetId: reportId,
      targetType: 'Report',
      ipAddress: req.ip || req.headers['x-forwarded-for'] || 'unknown',
      details: `Report ${reportId} marked as ${status}. Resolution: ${resolution || 'None'}${userActionDetails}`
    });

    // 5. ASYNCHRONOUSLY DISPATCH NOTIFICATION EMAIL (Doesn't block the HTTP response)
    if (targetUser && targetUser.email) {
      let emailSubject = 'Important Account Status Update';
      let emailBody = `Hello ${targetUser.username},\n\n`;

      switch (action) {
        case 'ban':
          emailSubject = 'Account Suspension Notice';
          emailBody += `We regret to inform you that your account has been permanently suspended due to community standard violations.\n\nReason: ${resolution}`;
          break;
        case 'unban':
          emailSubject = 'Account Reinstatement Notice';
          emailBody += `Good news! Your account access privileges have been fully restored. You may now log back into the application.`;
          break;
        case 'mute':
          emailSubject = 'Account Temporary Restriction Notice';
          emailBody += `Your profile privileges have been temporarily restricted. You will be unable to send public text interactions or updates for the next 24 hours.\n\nReason: ${resolution}`;
          break;
        case 'strip_assets':
          emailSubject = 'Profile Content Removal Notice';
          emailBody += `Certain visual media assets or biography info metadata layouts on your profile were found in violation of our policy and have been cleared out by our moderation team.\n\nReason: ${resolution}`;
          break;
      }

      emailBody += `\n\nBest regards,\nModeration Safety Team`;

      // Dispatched without an 'await' so the admin receives a fast API response
      // sendNotificationEmail(targetUser.email, emailSubject, emailBody);
      sendMail({
        from: process.env.AUTH_EMAIL,
        to: targetUser.email,
        subject: emailSubject,
        html: emailBody
      });
    }

    // 6. Respond back successfully to client interface requests
    return res.status(200).json({
      status: 'success',
      message: `Abuse ticket status updated successfully${action && action !== 'none' ? ` with action: ${action}` : ''}.`,
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

