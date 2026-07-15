const User = require('../user/model');
const Wallet = require('../wallet/model');
const Message = require('../message/model');
const { PostImage: Photo } = require('../upload_image/model');
const VerificationRequest = require('../verificationRequest/model');
const Transaction = require('../transaction/model');

const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

// 2.1 GET /admin/user/all
exports.getAllUsers = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    
    const { search, gender, verification } = req.query;
    let matchQuery = {};

    // 1. Search filter (username or email)
    if (search) {
      matchQuery.$or = [
        { username: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } }
      ];
    }

    // 2. Gender filter
    if (gender && gender !== 'all') {
      matchQuery.gender = { $regex: new RegExp(`^${gender}$`, 'i') };
    }

    // 3. Verification state mapping filters
    if (verification && verification !== 'all') {
      if (verification === 'verified') {
        matchQuery['verificationStatus.kyc'] = true;
      } else if (verification === 'unverified') {
        matchQuery['verificationStatus.kyc'] = false;
      } else if (verification === 'pending_kyc') {
        // Query against outstanding pending verification ticket items
        const pendingUserIds = await VerificationRequest.distinct('userId', { type: 'kyc', status: 'pending' });
        matchQuery._id = { $in: pendingUserIds };
      }
    }

    // Execute paginated search execution pipeline
    const users = await User.find(matchQuery)
      .sort({ dateCreated: -1 })
      .skip(skip)
      .limit(limit);

    const formattedUsers = users.map(user => ({
      _id: user._id,
      username: user.username,
      email: user.email,
      phone: user.phone || "",
      profilePic: user.profilePic || "",
      gender: user.gender || "Not Specified",
      age: user.age || "N/A",
      active: user.active,
      phoneVerification: user.verificationStatus?.phone || false,
      emailVerification: user.verificationStatus?.email || false,
      faceVerification: user.verificationStatus?.face || false,
      kycVerification: user.verificationStatus?.kyc || false,
      userType: user.role || "regular",
      registrationDate: user.dateCreated
    }));

    return res.status(200).json({
      status: "success",
      data: formattedUsers
    });
  } catch (error) {
    next(error);
  }
};

// 2.2 GET /admin/user/single/:id
exports.getSingleUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id)
      .populate('interests', 'title createdAt');
    if (!user) {
      return res.status(404).json({ status: 'error', message: 'User profile not found.' });
    }
       const wallet = await Wallet.findOne({userId: req.params.id})
       const transactions = await Transaction.find({userId: req.params.id})
      const photos = await Photo.find({userId: req.params.id});

    return res.status(200).json({
      status: "success",
      data: {
        _id: user._id,
        username: user.username,
        email: user.email,
        phone: user.phone || "",
        profilePic: user.profilePic || "",
        coverPic: user.coverPic || "",
        gender: user.gender || "Not Specified",
        age: user.age || "N/A",
        bio: user.bio || "",
        active: user.active,
        profession: user.profession || "",
        address: user.address || "",
        blockedUsers: user.blockedUsers || [],
        interest: user.interests || [],
        phoneVerification: user.verificationStatus?.phone || false,
        emailVerification: user.verificationStatus?.email || false,
        faceVerification: user.verificationStatus?.face || false,
        kycVerification: user.verificationStatus?.kyc || false,
        userType: user.role || "regular",
        dateOfBirth: user.dateOfBirth || null,
        registrationDate: user.dateCreated,
        wallet: wallet ? {
          balance: wallet.balance,
          frozen: wallet.frozen
        } : null,
        transactionLedger:transactions,
        photos: photos
      }
    });
  } catch (error) {
    next(error);
  }
};

// 2.3 PUT /admin/user/status/:id
exports.updateUserStatus = async (req, res, next) => {
  try {
    const { active } = req.body;

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { $set: { active: active } },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ status: 'error', message: 'User account not found.' });
    }

    return res.status(200).json({
      status: "success",
      message: "User status updated successfully",
      data: {
        _id: user._id,
        active: user.active
      }
    });
  } catch (error) {
    next(error);
  }
};

// 2.4 POST /admin/user/reset-password
exports.resetUserPassword = async (req, res, next) => {
  try {
    const { userId, password } = req.body;

    if (!password || password.length < 6) {
      return res.status(400).json({ status: 'error', message: 'Password must be at least 6 characters long.' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.findByIdAndUpdate(
      userId,
      { $set: { password: hashedPassword } }
    );

    if (!user) {
      return res.status(404).json({ status: 'error', message: 'User account not found.' });
    }

    return res.status(200).json({
      status: "success",
      message: "Password updated successfully"
    });
  } catch (error) {
    next(error);
  }
};

// 2.5 DELETE /admin/user/delete/:id
exports.purgeUserAccount = async (req, res, next) => {
  // const session = await mongoose.startSession();
  // session.startTransaction();

  try {
    const userId = req.params.id;

    const user = await User.findById(userId)
    // .session(session);
    if (!user) {
      // await session.abortTransaction();
      return res.status(404).json({ status: 'error', message: 'User target matching record not found.' });
    }

    // Cascading purge execution flow across all peripheral relational collection schemas
    await Wallet.deleteOne({ userId })
    // .session(session);
    await Photo.deleteMany({ userId })
    // .session(session);
    await VerificationRequest.deleteMany({ userId })
    // .session(session);
    
    // Purge messaging records where user was either sender or recipient
    await Message.deleteMany({
      $or: [{ senderId: userId }, { receiverId: userId }]
    })
    // .session(session);

    // Finally, remove the primary profile doc record itself
    await User.findByIdAndDelete(userId)
    // .session(session);

    // await session.commitTransaction();
    // session.endSession();

    return res.status(200).json({
      status: "success",
      message: "User account permanently purged"
    });
  } catch (error) {
    // await session.abortTransaction();
    // session.endSession();
    next(error);
  }
};