const Users = require("../models/schema");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");

const register = asyncHandler(async (req, res) => {
  console.log(req.body);
  const hash = await bcrypt.hash(req.body.password, 10);
  const data = await Users.findOne({ name: req.body.name });
  if (data == null) {
    const user = await Users.create({
      name: req.body.name,
      password: hash,
    });
    const create = await user.save().then(() => {
      res.status(201).json({ created: true });
    });
  } else {
    res.status(409).json({ created: false });
  }
});

module.exports = { register };
