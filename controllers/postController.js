const Post = require("../models/postModel");

exports.getAllPosts = async (req, res, next) => {
  try {
    const posts = await Post.find();

    res.status(200).json({
      status: "Success 200",
      results: posts.length,
      data: {
        posts,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "Error 404",
    });
  }
};

exports.getOnePost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);

    res.status(200).json({
      status: "Success 200",
      data: {
        post,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "Error 404",
    });
  }
};

exports.createPost = async (req, res, next) => {
  try {
    const post = await Post.create(req.body);

    res.status(200).json({
      status: "Success 200",
      data: {
        post,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "Error 404",
    });
  }
};

exports.updatePost = async (req, res, next) => {
  try {
    const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      status: "Success 200",
      data: {
        post,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "Error 404",
    });
  }
};

exports.deletePost = async (req, res, next) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);

    res.status(200).json({
      status: "Success 200",
    });
  } catch (error) {
    res.status(400).json({
      status: "Error 404",
    });
  }
};
