const User = require("../model/userModel");
const bcrypt = require("bcrypt");

exports.registerController = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const usernameExist = await User.findOne({ username });
    if (usernameExist)
      return res.json({ msg: " Username already exist", status: false });
    const emailExist = await User.findOne({ email });
    if (emailExist)
      return res.json({ msg: " Email already exist", status: false });
    const hashPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      email,
      username,
      password: hashPassword,
    });
    delete user.password;
    return res.json({ msg: "User created successfully", status: true, user });
  } catch (error) {
    next(error);
  }
};