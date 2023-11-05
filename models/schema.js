const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      min: 3,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    socials: {
      instagram: { type: String },
      youtube: { type: String },
      twitterX: { type: String },
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Users", userSchema);
