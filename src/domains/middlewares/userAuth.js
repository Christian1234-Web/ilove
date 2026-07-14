const jwt = require('jsonwebtoken');
const User = require('../user/model'); // Adjust the path to your User model if needed

exports.protectUser = async (req, res, next) => {
  let token;

  // 1. Extract the token from the Authorization Header
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  // 2. Reject if no token is provided
  if (!token) {
    return res.status(401).json({ 
      status: 'error', 
      message: 'Not authorized to access this route. Token missing.' 
    });
  }

  try {
    // 3. Verify the token signature using your environmental JWT secret
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 4. Verification Check: Ensure the user still exists in your database
    // (This prevents deleted or banned users with unexpired tokens from making requests)
    const currentUser = await User.findById(decoded.id);
    if (!currentUser) {
      return res.status(401).json({
        status: 'error',
        message: 'The user belonging to this session token no longer exists.'
      });
    }

    // 5. Attach the user object to the request lifecycle
    req.user = currentUser; 
    next();
    
  } catch (error) {
    return res.status(401).json({ 
      status: 'error', 
      message: 'Session expired or token invalid.' 
    });
  }
};