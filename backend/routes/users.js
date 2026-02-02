const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const UserController = require("../controller/UserController");
const handleErrorMessage = require("../middlewares/handleErrorMessage");
router.post("/login", UserController.login);

router.post(
  "/register",
  [
    body("name").notEmpty(),
    body("email").notEmpty(),
    body("password").notEmpty(),
  ],
  handleErrorMessage,
  UserController.register,
);

module.exports = router;
