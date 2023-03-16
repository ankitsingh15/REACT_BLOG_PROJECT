const Post = require("../models/Post");
const { error, success } = require("../utils/Utils");
const cloudinary = require("cloudinary");

const addPost = async (req, res) => {
  try {
    const { username, title, desc, categories } = req.body;
    if (!username || !title || !desc) {
      return res.send(error(401, "Username,Title and Desc is Redq"));
    }
    const postImg = req.body.postImg;
    const cloudImg = await cloudinary.uploader.upload(postImg, {
      folder: "PostBlogImage",
    });

    const newPost = await Post.create({
      username,
      title,
      desc,
      categories,
      photo: {
        publicId: cloudImg.public_id,
        url: cloudImg.secure_url,
      },
    });
    const savedPost = await newPost.save();
    return res.send(success(200, savedPost));
  } catch (e) {
    return res.send(error(500, e.message));
  }
};

const updatePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (req.body.username !== post.username) {
      return res.send(error(401, "You can Only Update your Post"));
    }
    const updatedPost = await Post.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    // console.log("updated Post is", updatedPost);
    return res.send(success(200, { updatedPost }));
  } catch (e) {
    return res.send(error(500, e.message));
  }
};

const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    console.log(
      "backend delete is",
      req.params.id,
      post.username,
      req.body.username
    );

    if (req.body.username !== post.username) {
      return res.send(error(401, "You can Only Delete your Post"));
    }
    const deletedPost = await Post.deleteOne({ _id: req.params.id });

    return res.send(success(200, { deletedPost }));
  } catch (e) {
    return res.send(error(500, e.message));
  }
};

const getById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    return res.send(success(200, { post }));
  } catch (e) {
    return res.send(error(500, e.message));
  }
};

const getAllPost = async (req, res) => {
  try {
    const username = req.query.user;
    const catName = req.query.cat;
    let posts;
    if (username) {
      posts = await Post.find({ username });
    } else if (catName) {
      posts = await Post.find({
        categories: {
          $in: [catName],
        },
      });
    } else {
      posts = await Post.find();
    }
    return res.send(success(200, { posts }));
  } catch (e) {
    return res.send(error(500, e.message));
  }
};

module.exports = {
  addPost,
  updatePost,
  deletePost,
  getById,
  getAllPost,
};
