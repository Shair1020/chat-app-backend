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

exports.loginController = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user)
      return res.json({
        msg: "Incorrect username or password",
        status: false,
      });
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword)
      return res.json({ msg: "Incorrect username or password", status: false });
    delete user.password;
    return res.json({ msg: "login successfully", status: true, user });
  } catch (error) {
    next(error);
  }
};

exports.setAvatar = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const avatarImage = req.body.image;
    const userData = await User.findByIdAndUpdate(userId, {
      isAvatarImageSet: true,
      avatarImage,
    });
    return res.json({
      isSet: userData.isAvatarImageSet,
      image: userData.avatarImage,
    });
  } catch (error) {
    next(error);
  }
};

exports.getAllUsers = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const users = await User.find({ _id: { $ne: userId } }).select([
      "email",
      "username",
      "avatarImage",
      // "_id",
    ]);
    return res.json(users);
  } catch (error) {
    next(error);
  }
};
