const express = require("express");
const {protected} = require('../middleware/authMiddleware')
const {
  registerUser,
  loginUser,
  getMe,
} = require("../controller/userController");

const router = express.Router();

router.post("/", registerUser);
router.post("/login", loginUser);
router.get("/me", protected, getMe);

module.exports = router;
