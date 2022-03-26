const User = require("../models/userModel");
const bcrypt = require("bcryptjs");

exports.signUp = async (req, res) => {
  const { username, password } = req.body;

  try {
    const hashPassword = await bcrypt.hash(password, 12);
    const newUser = await User.create({
      username,
      password: hashPassword,
    });
    req.session.user = newUser;
    res.status(201).json({
      status: "Success create a new User",
      data: {
        user: newUser,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "Error 404",
    });
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({
        status: "Error 404",
        message: "User not found",
      });
    }

    const isPassword = await bcrypt.compare(password, user.password);

    if (isPassword) {
      req.session.user = user;
      res.status(200).json({
        status: "Success Login",
      });
    } else {
      res.status(400).json({
        status: "Error 400",
        message: "Incorrect username or password",
      });
    }
  } catch (error) {
    res.status(400).json({
      status: "Error 400",
    });
  }
};
