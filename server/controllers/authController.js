const User = require("../models/User");
const { success, error } = require("../utils/Utils.js");
const bcrypt = require("bcrypt");

//REGISTRATION
const registerUser = async (req, res) => {
  try {
    console.log("In registerUser");
    const newPas = await bcrypt.hash(req.body.password, 10);
    const newUser = User({
      username: req.body.username,
      email: req.body.email,
      password: newPas,
    });
    const user = await newUser.save();
    return res.send(success(200, user));
  } catch (e) {
    return res.send(error(500, e.message));
  }
};

const loginUser = async (req, res) => {
  try {
    const username = req.body.username;

    const pas = req.body.password;
    const user = await User.findOne({ username });
    if (!user) {
      return res.send(success(400, "Credantials Not Match"));
    }
    const check = await bcrypt.compare(pas, user.password);
    const { password, ...others } = user._doc;
    if (check) {
      return res.send(success(200, { others }));
    }
    return res.send(success(401, "Credantials Not Match"));
  } catch (e) {
    res.send(error(500, e.message));
  }
};

module.exports = {
  registerUser,
  loginUser,
};

//LOGIN
