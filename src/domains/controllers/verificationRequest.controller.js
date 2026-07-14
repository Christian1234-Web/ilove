const VerificationRequest = require('../verificationRequest/model');
const User = require('../user/model');
const mongoose = require('mongoose');

// 1. GET /admin/verification/pending
// Function: Fetch pending face recognition, email, and KYC requests[cite: 1].
exports.getPendingVerifications = async (req, res, next) => {
  try {
    const { type } = req.query; //[cite: 1] // Accepts: "face" | "kyc" | "email" | "all"[cite: 1]
    
    let query = { status: 'pending' };

    // Filter by type if explicitly requested and isn't 'all'[cite: 1]
    if (type && type !== 'all') { //[cite: 1]
      query.type = type; //[cite: 1]
    }

    const pendingQueue = await VerificationRequest.find(query)
      .populate('userId', 'username email phone profilePic') // Hydrates user details dynamically[cite: 1]
      .sort({ createdAt: 1 }); // Oldest first so admins process them chronologically[cite: 1]

    return res.status(200).json({
      status: 'success',
      data: pendingQueue
    });
  } catch (error) {
    next(error);
  }
};

// 2. POST /admin/verification/review
// Function: Approve or reject an active verification request[cite: 1].
exports.reviewVerificationRequest = async (req, res, next) => {
  const { requestId, status, reason } = req.body; //[cite: 1] // status: 'approved' | 'rejected'[cite: 1]

  if (status === 'rejected' && !reason) { //[cite: 1]
    return res.status(400).json({ status: 'error', message: 'A rejection reason is required.' }); //[cite: 1]
  }

  // Use an ACID transaction to guarantee both updates complete or fail together
  // const session = await mongoose.startSession();
  // session.startTransaction();

  try {
    // Locate the target verification ticket
    const request = await VerificationRequest.findById(requestId)
    // .session(session);
    if (!request) {
      // await session.abortTransaction();
      return res.status(404).json({ status: 'error', message: 'Verification request not found.' });
    }
    if (request.status !== 'pending') {
      // await session.abortTransaction();
      return res.status(400).json({ status: 'error', message: 'This ticket has already been processed.' });
    }

    // Update ticket state[cite: 1]
    request.status = status; //[cite: 1]
    if (reason) request.reason = reason; //[cite: 1]
    await request.save(); // { session } this is inside ()

    // If approved, flip the respective boolean verification field on the User collection[cite: 1]
    if (status === 'approved') { //[cite: 1]
      // Converts e.g., 'kyc' type parameter to update 'verificationStatus.kyc' dynamically
      const dynamicField = `verificationStatus.${request.type}`;
      
      await User.findByIdAndUpdate(
        request.userId,
        { $set: { [dynamicField]: true } },
        // { session }
      );
    }

    // Commit changes safely to the cluster database
    // await session.commitTransaction();
    // session.endSession();

    return res.status(200).json({
      status: 'success',
      message: 'Verification ticket processed successfully' //[cite: 1]
    });
  } catch (error) {
    // await session.abortTransaction();
    // session.endSession();
    next(error);
  }
};

/**
 * @desc    Submit a new verification request (Face, KYC, or Email)
 * @route   POST /admin/verification/create
 * @access  Private (Authenticated User)
 */
exports.createVerificationRequest = async (req, res, next) => {
  const { type, evidence } = req.body;
  // Assumes your user auth middleware attaches the authenticated user to req.user
  const userId = req.user ? req.user.id : req.body.userId; 

  try {
    // 1. Basic validation
    if (!userId) {
      return res.status(401).json({ status: 'error', message: 'User authentication required.' });
    }

    if (!type || !['face', 'kyc', 'email'].includes(type)) {
      return res.status(400).json({ 
        status: 'error', 
        message: 'Invalid verification type. Must be: face, kyc, or email.' 
      });
    }

    if (!evidence) {
      return res.status(400).json({ 
        status: 'error', 
        message: 'An evidence URL (photo or document frame) is required.' 
      });
    }

    // 2. Prevent spamming duplicate pending requests of the same type
    const existingPendingRequest = await VerificationRequest.findOne({
      userId,
      type,
      status: 'pending'
    });

    if (existingPendingRequest) {
      return res.status(400).json({ 
        status: 'error', 
        message: `You already have an active pending ${type} verification request.` 
      });
    }

    // 3. Create the verification request using the exact schema parameters
    const newRequest = await VerificationRequest.create({
      userId,
      type,
      evidence,
      status: 'pending'
    });

    return res.status(201).json({
      status: 'success',
      message: 'Verification request submitted successfully and is now pending review.',
      data: newRequest
    });

  } catch (error) {
    next(error);
  }
};