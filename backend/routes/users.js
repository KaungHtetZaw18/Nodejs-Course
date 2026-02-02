const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const UserController = require("../controller/UserController");
const handleErrorMessage = require("../middlewares/handleErrorMessage");
router.post("/login", UserController.login);
const User = require("../models/User");

router.post(
  "/register",
  [
    body("name").notEmpty(),
    body("email").notEmpty(),
    body("email").custom(async (value) => {
      const user = await User.findOne({ email: value });
      if (user) {
        throw new Error("E-mail already in use");
      }
    }),
    body("password").notEmpty(),
  ],
  handleErrorMessage,
  UserController.register,
);

module.exports = router;
