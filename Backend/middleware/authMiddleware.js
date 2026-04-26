const jwt = require("jsonwebtoken");

// middleware to check token
const authMiddleware = (req, res, next) => {

  try {

    // getting token from header
    const header =
      req.headers.authorization;

    // if header not present
    if (!header) {

      return res.status(401).json({
        message: "no token"
      });

    }

    // token is after Bearer
    const token =
      header.split(" ")[1];

    // if token missing
    if (!token) {

      return res.status(401).json({
        message: "token missing"
      });

    }

    // verify token
    const data =
      jwt.verify(
        token,
        process.env.JWT_SECRET
      );

    // save user id in request
    req.user = data.id;

    next();

  }

  catch (err) {

    console.log(err);

    res.status(401).json({
      message: "invalid token"
    });

  }

};

module.exports = authMiddleware;