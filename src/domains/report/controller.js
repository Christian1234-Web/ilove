const Report = require("./model");
const User = require("../user/model");

const createUserReport = async (req, res, next) => {
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
    const newReport = await Report.create({
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

const getMyReports = async (reporterId) => {
  try {
    const result = await Report.find({ reporterId }).sort({ createdAt: -1 })
      .populate("reporterId")
      .populate("reportedUserId");

    return result;
  } catch  (err) {
    throw err;
  }
};

const getSingleReport = async (reportId,userId) => {
  try {
    const result = await Report.findById(reportId).populate("reporterId").populate("reportedUserId");

    if (!result) {
      return { error: "Report not found" };
    }

    // Ensure report belongs to logged-in user
    if (
      result.reporterId._id.toString() !==
      userId.toString()
    ) {
      return { error: "Unauthorized access" };
    }

    return { data: result };
  } catch (error) {
    return { error: error.message };
    };
};


module.exports = {
  getMyReports,
  createUserReport,
  getSingleReport
};
