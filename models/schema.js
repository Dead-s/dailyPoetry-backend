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
      instagram: { type: String, default: "https://instagram.com" },
      youtube: { type: String, default: "https://youtube.com" },
      twitterX: { type: String, default: "https://twitter.com" },
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Users", userSchema);
