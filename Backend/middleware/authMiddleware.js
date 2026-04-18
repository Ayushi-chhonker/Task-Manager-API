const jwt = require("jsonwebtoken");

// middleware to verify user token
const authMiddleware = (req, res, next) => {

  try {

    // Get token from header
    const authHeader = req.header("Authorization");

    if (!authHeader) {
      return res.status(401).json({
        message: "No token, authorization denied"
      });
    }

    // Remove "Bearer " from token
    const token = authHeader.split(" ")[1];

    // Verify token using secret key
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    // Attach user id
    req.user = decoded.id;

    next();

  } catch (error) {

    res.status(401).json({
      message: "Token is not valid"
    });

  }

};
//exporting middleware
module.exports = authMiddleware;