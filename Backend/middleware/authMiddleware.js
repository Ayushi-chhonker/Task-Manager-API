const jwt = require("jsonwebtoken");

// middleware to verify user token
const authMiddleware = (req, res, next) => {

  try {

    // Get Authorization header
    const authHeader =
      req.header("Authorization");

    // Step 2: Check if header exists
    if (!authHeader) {

      return res.status(401).json({
        message: "No token, authorization denied"
      });

    }

    //Extract token safely
    // Bearer token_here
    const token =
      authHeader.split(" ")[1];

    // Check if token exists
    if (!token) {

      return res.status(401).json({
        message: "Token missing"
      });

    }

    //Verify token using secret key
    const decoded =
      jwt.verify(
        token,
        process.env.JWT_SECRET
      );

   // Attach user id to request
    req.user =
      decoded.id;
    next();

  }

  catch (error) {

    console.log(
      "Token Error:",
      error.message
    );

    res.status(401).json({
      message: "Token is not valid"
    });

  }

};

// exporting middleware
module.exports = authMiddleware;