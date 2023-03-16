const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      unique: true,
    },
    desc: {
      type: String,
      unique: true,
    },
    photo: {
      publicId: String,
      url: String,
    },
    username: {
      type: String,
      required: true,
    },
    categories: {
      type: [],
      required: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", PostSchema);
