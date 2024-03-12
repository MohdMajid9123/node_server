const jwt = require("jsonwebtoken");

const jwtAutMiddleWare = (req, res, next) => {
  // first check request headers has authorization or not

  const authorization = req.headers.authorization;
  if (!authorization) return res.status(401).json({ error: "token not foud" });

  // extract the jwt tokens from the request headers
  const token = req.headers.authorization.split(" ")[1];

  if (!token) return res.status(401).json({ error: "Unauthorize" });

  try {
    // verify the JWT token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach user information to the request object

    // user ke jagha per aap koe v name likh sakte hai ok.
    req.user = decoded;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: "invalid token" });
  }
};

// FUNCTION TO GENERATE jwt token

const generateToken = (userData) => {
  //Generate a new JWT token using user data
  return jwt.sign(userData, process.env.JWT_SECRET);
};

module.exports = { jwtAutMiddleWare, generateToken };
