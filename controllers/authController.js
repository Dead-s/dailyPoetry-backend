const Users = require("../models/schema");
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const login = asyncHandler(async (req, res) => {
  console.log("cookie ", req.cookies);
  const data = await Users.findOne({ name: req.body.name });
  if (data !== null) {
    if (await bcrypt.compare(req.body.password, data.password)) {
      console.log(req.body);
      return res
        .cookie(
          "secureCookie",
          jwt.sign(
            {
              id: data._id,
              user: data.name,
            },
            process.env.Secret_key
          ),
          req.body.remember
            ? {
              httpOnly: true,
              secure: true,
              path: "/",
              maxAge: 15 * 24 * 60 * 60 * 1000,
              sameSite: "none"
            }
            : {
              httpOnly: true,
              path: "/",
              secure: true,
            }
        )
        .json({ msg: "success" });
      // return res.status(200).json({ loggedIn: true });
    } else {
      return res.status(401).json({ wrong_pass: true });
    }
  } else {
    return res.status(404).json({ UserNotFound: true });
  }
});

const logout = asyncHandler(async (req, res) => {
  res.clearCookie("secureCookie").json({ logout: true });
});

module.exports = {
  login,
  logout,
};
