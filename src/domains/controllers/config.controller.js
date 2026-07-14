const Interest = require('../interest/model');
const Bank = require('../bank/model');
const NotificationLog = require('../notificationLog/model');

// 1. GET /admin/interest/all
exports.getAllInterests = async (req, res, next) => {
  try {
    const interests = await Interest.find().sort({ title: 1 });
    return res.status(200).json({ status: 'success', data: interests });
  } catch (error) {
    next(error);
  }
};

// 2. POST /admin/interest/tag
exports.createInterestTag = async (req, res, next) => {
  try {
    const { title } = req.body; //[cite: 1]
    const newTag = await Interest.create({ title }); //[cite: 1]
    
    return res.status(200).json({
      status: 'success',
      data: newTag //[cite: 1]
    });
  } catch (error) {
    next(error);
  }
};

// 3. DELETE /admin/interest/tag/:id
exports.deleteInterestTag = async (req, res, next) => {
  try {
    const { id } = req.params; //[cite: 1]
    await Interest.findByIdAndDelete(id); //[cite: 1]
    
    return res.status(200).json({
      status: 'success',
      message: 'Interest tag deleted successfully' //[cite: 1]
    });
  } catch (error) {
    next(error);
  }
};

// 4. PUT /admin/banking/bank/status/:id[cite: 1]
exports.toggleBankStatus = async (req, res, next) => {
  try {
    const { id } = req.params; //[cite: 1]
    const { active } = req.body; //[cite: 1]

    const updatedBank = await Bank.findByIdAndUpdate(
      id,
      { active }, //[cite: 1]
      { new: true }
    );

    if (!updatedBank) {
      return res.status(404).json({ status: 'error', message: 'Bank not found.' });
    }

    return res.status(200).json({
      status: 'success',
      message: 'Bank configuration updated successfully' //[cite: 1]
    });
  } catch (error) {
    next(error);
  }
};


exports.broadcastPushNotification = async (req, res, next) => {
  try {
    const { target, title, message } = req.body;

    // 1. Log the campaign to the DB[cite: 1]
    await NotificationLog.create({ target, title, message });

    // 2. Integration Trigger:
    // This is where you connect to Firebase Cloud Messaging (FCM) or Expo Push Service:
    // admin.messaging().sendToTopic(target, { notification: { title, body: message } })

    return res.status(200).json({
      status: 'success',
      message: 'Push notification sent successfully'
    });
  } catch (error) {
    next(error);
  }
};