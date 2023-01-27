const {
  registerController,
  loginController,
  setAvatar,
} = require("../controller/userController");

const router = require("express").Router();

router.post("/register", registerController);
router.post("/login", loginController);
router.post("/setAvatar/:id", setAvatar);

module.exports = router;
