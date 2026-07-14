const jwt = require('jsonwebtoken');

exports.protectAdmin = (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({ status: 'error', message: 'Not authorized to access this route.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Ensure the token owner has 'admin' or 'moderator' system status tags
    // Quick fix recommendation for your existing middleware file:
    if (decoded.role !== 'admin' && decoded.role !== 'moderator' && decoded.role !== 'superadmin') {
      return res.status(403).json({ status: 'error', message: 'Access denied: Administrative clearance required.' });
    }

    req.adminUser = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ status: 'error', message: 'Session expired or token invalid.' });
  }
};