module.exports = (err, req, res, next) => {
  console.error('💥 Server Error:', err.stack);

  // Catch Mongoose invalid hex ID conversions (CastError) safely
  if (err.name === 'CastError') {
    return res.status(400).json({
      status: 'error',
      message: `Resource formatting invalid: Resource with ID "${err.value}" does not exist.`
    });
  }

  // Handle Mongoose index duplicate constraint errors
  if (err.code === 11000) {
    return res.status(400).json({
      status: 'error',
      message: 'Duplicate value conflict: A record with that unique field already exists.'
    });
  }

  // General server failure fallback protection
  return res.status(err.statusCode || 500).json({
    status: 'error',
    message: err.message || 'Internal Server Error encountered.'
  });
};