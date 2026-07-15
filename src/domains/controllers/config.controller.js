const Interest = require('../interest/model');
const Bank = require('../bank/model');
const NotificationLog = require('../notificationLog/model');
const { getSocketIO } = require('../sochet/index'); // Adjust this path to where your socket.js is located
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


// broadcast push notification to all online users
exports.broadcastPushNotification = async (req, res, next) => {
  try {
    const { target, title, message } = req.body;

    if (!title || !message) {
      return res.status(400).json({ status: 'error', message: 'Title and message are required.' });
    }

    // 1. Log the campaign to your database
    await NotificationLog.create({ target, title, message });

    // 2. Real-time Socket.io Broadcast
    // Grab your initialized socket instance using your custom getter
    const io = getSocketIO();

    const payload = {
      title,
      message,
      target,
      createdAt: new Date(),
    };

    if (target && target !== 'all') {
      // Broadcast exclusively to clients who have joined a specific targeting room
      // (e.g., users who called socket.join('premium_users') on the frontend)
      io.to(target).emit('new_notification', payload);
    } else {
      // Broadcast globally to all online socket connections
      io.emit('new_notification', payload);
    }

    // 3. Optional: Mobile Push notification services
    // admin.messaging().sendToTopic(target, { notification: { title, body: message } })

    return res.status(200).json({
      status: 'success',
      message: 'Push notification logged and socket broadcasted successfully',
      data: payload
    });
  } catch (error) {
    next(error);
  }
};