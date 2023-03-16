const { error, success } = require("../utils/Utils");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const Post = require("../models/Post");
const cloudinary = require("cloudinary");

const updateUser = async (req, res) => {
  console.log("in updateUser");
  if (req.body.userId === req.params.id) {
    if (req.body.password) {
      req.body.password = await bcrypt.hash(req.body.password, 10);
    }
    const cloudImg = await cloudinary.uploader.upload(req.body.postImg, {
      folder: "PostBlogImage",
    });

    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: {
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            ProfilePic: {
              publicId: cloudImg.public_id,
              url: cloudImg.secure_url,
            },
          },
        },
        { new: true }
      );
      return res.send(success(200, { updatedUser }));
    } catch (e) {
      return res.send(error(500, e.message));
    }
  } else {
    return res.send(error(401, "You can Only update your account"));
  }
};

const deleteUser = async (req, res) => {
  if (req.body.userId === req.params.id) {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.send(error(401, "User not Found"));
    }
    await Post.deleteMany({ username: user.username });

    try {
      await User.findByIdAndDelete(req.params.id);

      return res.send(success(200, "User Deleted"));
    } catch (e) {
      return res.send(error(500, e.message));
    }
  } else {
    return res.send(error(401, "You can Only Delete your account"));
  }
};

const getUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);
    if (!user) {
      return res.send(success(401, "User Not Found"));
    }

    const { password, ...others } = user._doc;

    return res.send(success(200, { others }));
  } catch (e) {
    return res.send(error(500, e.message));
  }
};

module.exports = {
  updateUser,
  deleteUser,
  getUser,
};
