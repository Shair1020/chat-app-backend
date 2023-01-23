const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please enter a username"],
    unique: true,
    trim: true,
    min: 3,
    max: 20,
  },
  email: {
    type: String,
    required: [true, "Please enter an email"],
    unique: true,
    max: 50,
    min: 3,
  },
  password: {
    type: String,
    required: [true, "Please enter a password"],
    min: 8,
  },
  isAvatarImageSet: {
    type: Boolean,
    default: false,
  },
  avatarImage: {
    type: String,
    default: "",
  },
});

const User = mongoose.model("ChatUser", userSchema);
module.exports = User;
