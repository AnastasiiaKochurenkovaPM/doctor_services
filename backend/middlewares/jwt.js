const jwt = require('jsonwebtoken');
const createError = require('../utils/createError');

const verifyToken = (req, res, next) => {
  const token = req.cookies.accessToken;
  
  if (!token) {
    return next(createError(401, "You're not authenticated!"));
  }

  jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
    if (err) {
      return next(createError(403, "Token is not valid!"));
    }
    req.userId = decoded.id; // Отримуємо ID користувача
    next();
  });
};

module.exports = verifyToken;
