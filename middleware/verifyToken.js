const jwt = require("jsonwebtoken");
const Users = require("../models/schema");
const asyncHandler = require("express-async-handler");

const verifytoken = asyncHandler((req, res, next) => {
  console.log("cookie", req.cookies);
  const token = req.cookies.secureCookie;
  if (!token) {
    return res.status(401).json("No token found");
  }
  jwt.verify(token, process.env.Secret_key, async (err, user) => {
    if (err) {
      return res.status(403).json("Invalid token");
    }
    if (user) {
      const data = await Users.findById(user.id);
      if (data.name == user.user) {
        req.body.user = data.name;
        req.body.userId = data._id;
      }
    }
    // return res.status(200).json(user);
    next();
  });
});

module.exports = verifytoken;
