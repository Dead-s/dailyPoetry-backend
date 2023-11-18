const Users = require("../models/schema");
const asyncHandler = require("express-async-handler");

const getSocials = asyncHandler(async (req, res) => {
  console.log("hello ", req.query);
  if (req.query.username) {
    const user = await Users.findOne({ name: req.query.username });
    if (user != null) {
      res.send(user.socials);
    } else {
      res.status(404).send("User not found!");
    }
  }
  if (req.query.id) {
    const user = await Users.findById(req.query.id);
    if (user != null) {
      res.send(user.socials);
    } else {
      res.status(404).send("User not found!");
    }
  }
});
const addSocials = asyncHandler(async (req, res) => {
  console.log(req.body);
  const user = await Users.findById(req.body.id);
  if (user !== null) {
    const Socials = await Users.updateOne(
      { _id: req.body.id },
      {
        socials: {
          instagram: req.body.socials.instagram,
          youtube: req.body.socials.youtube,
          twitterX: req.body.socials.twitterX,
        },
      }
    )
      .then(() => {
        return res.status(200).json({ updated: true });
      })
      .catch((e) => {
        return res.status(409).json({ updated: false });
      });
  } else {
    return res.send("not found");
  }
});

module.exports = {
  getSocials,
  addSocials,
};
