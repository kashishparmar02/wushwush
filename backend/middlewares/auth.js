// middlewares/auth.js

const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(403).json({ message: 'Access Denied: No Token Provided!' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach the decoded token (which contains user ID) to the request
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Access Denied: Invalid Token!' });
  }
};

module.exports = verifyToken;
