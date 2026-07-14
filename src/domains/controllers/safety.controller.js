const SafetyBan = require('../safetyBan/model');
const Photo = require('../photo/model');
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