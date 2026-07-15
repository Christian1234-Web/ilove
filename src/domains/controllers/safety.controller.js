const SafetyBan = require('../safetyBan/model');
const { PostImage: Photo } = require('../upload_image/model');
const User = require('../user/model');

exports.getSafetySummary = async (req, res, next) => {
  try {
    // 1. Gather counts of active systemic blocks from your hardware/IP blacklist database
    const activeBans = await SafetyBan.find({}).select('targetType');
    
    const hardwareBansCount = activeBans.filter(b => b.targetType === 'hardware_uuid').length;
    const ipBansCount = activeBans.filter(b => b.targetType === 'ip').length;

    // 2. Count today's automatically flagged images
    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);

    const automatedFlagsToday = await Photo.countDocuments({
      status: 'flagged',
      createdAt: { $gte: startOfToday }
    });

    // 3. Count currently deactivated or flagged users
    const flaggedUsersCount = await User.countDocuments({ active: false });

    return res.status(200).json({
      status: "success",
      data: {
        scanners: {
          photoDna: "active",
          groomingNlp: "active",
          flagsToday: automatedFlagsToday
        },
        blocking: {
          activeBlocks: hardwareBansCount + ipBansCount, // Total enforcement blocks
          flaggedUsers: flaggedUsersCount
        },
        bans: {
          hardwareBans: hardwareBansCount,
          blockedIpRanges: ipBansCount
        }
      }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Create a new hardware UUID or IP address systemic ban
 * @route   POST /api/safety/ban
 * @access  Private (Admin Only)
 */
exports.createSafetyBan = async (req, res, next) => {
  try {
    const { targetType, targetValue, reason } = req.body;
    const adminId = req.adminUser.id; // From your auth middleware (e.g. protectAdmin)

    // 1. Payload validation
    if (!targetType || !['ip', 'hardware_uuid'].includes(targetType)) {
      return res.status(400).json({
        status: 'error',
        message: 'Invalid target type. Must be either "ip" or "hardware_uuid".'
      });
    }

    if (!targetValue || targetValue.trim() === '') {
      return res.status(400).json({
        status: 'error',
        message: 'Target value is required.'
      });
    }

    if (!reason || reason.trim() === '') {
      return res.status(400).json({
        status: 'error',
        message: 'A clear reason for imposing this safety ban must be provided.'
      });
    }

    // 2. Prevent duplicate bans
    const existingBan = await SafetyBan.findOne({ targetValue });
    if (existingBan) {
      return res.status(409).json({
        status: 'error',
        message: `This ${targetType} is already banned in the system database.`
      });
    }

    // 3. Create and register the ban configuration
    const newBan = await SafetyBan.create({
      targetType,
      targetValue,
      reason,
      bannedBy: adminId
    });

    return res.status(201).json({
      status: 'success',
      message: `${targetType === 'ip' ? 'IP Address' : 'Hardware identifier'} has been blacklisted system-wide.`,
      data: newBan
    });

  } catch (error) {
    next(error);
  }
};