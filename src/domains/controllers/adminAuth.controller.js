const jwt = require('jsonwebtoken');
const Admin = require('../adminUser/model');

/**
 * @desc    Provision a brand new administrative staff profile
 * @route   POST /admin/auth/register
 * @access  Private (Superadmin Only)
 */
exports.registerAdmin = async (req, res, next) => {
  const { name, email, password, role } = req.body;

  try {
    // 1. Basic validation
    if (!name || !email || !password) {
      return res.status(400).json({ status: 'error', message: 'Name, email, and password fields are all required.' });
    }

    // 2. Prevent duplicate admin generation
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(409).json({ status: 'error', message: 'An account with this email address already exists.' });
    }

    // 3. Create account (Bcrypt hashing triggers automatically inside Admin.js pre-save hook)
    const newAdmin = await Admin.create({
      name,
      email,
      password,
      role: role || 'admin'
    });

    // Remove password string field from JSON response visibility
    newAdmin.password = undefined;

    res.status(201).json({
      status: 'success',
      message: 'Administrative staff profile created successfully.',
      data: { admin: newAdmin }
    });

  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Authenticate administrator and return access session token
 * @route   POST /admin/auth/login
 * @access  Public
 */
exports.loginAdmin = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({ status: 'error', message: 'Please provide email and password.' });
    }

    // Explicitly select the password hash to test validity
    const admin = await Admin.findOne({ email }).select('+password');
    if (!admin || !(await admin.comparePassword(password, admin.password))) {
      return res.status(401).json({ status: 'error', message: 'Incorrect email or password.' });
    }

    // Assert account operational health status
    if (!admin.active) {
      return res.status(403).json({ status: 'error', message: 'This administrative account has been deactivated.' });
    }

    // Issue cryptographic signature
    const token = jwt.sign(
      { id: admin._id, role: admin.role, username: admin.name },
      process.env.JWT_SECRET || 'fallback_super_secret_key_change_me',
      { expiresIn: process.env.JWT_EXPIRES_IN || '1d' }
    );

    admin.password = undefined;

    res.status(200).json({
      status: 'success',
      token,
      data: { admin }
    });

  } catch (error) {
    next(error);
  }
};