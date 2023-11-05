const mongoose = require("mongoose");

const poetrySchema = new mongoose.Schema(
  {
    name: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Users",
    },
    content: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("poetries", poetrySchema);
