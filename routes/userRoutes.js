const {
  registerController,
  loginController,
} = require("../controller/userController");

const router = require("express").Router();

router.post("/register", registerController);
router.post("/login", loginController);

module.exports = router;
