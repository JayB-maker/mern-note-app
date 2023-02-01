const asyncHandler = require("express-async-handler");
const userModel = require("../models/usermodels");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    res.status(400);
    throw new Error("All fields are required");
  }
  const checkUser = await userModel.findOne({ email });
  if (checkUser) {
    res.status(400);
    throw new Error("User already exist");
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const user = await userModel.create({
    username,
    email,
    password: hashedPassword,
  });

  res.status(201);
  res.json({
    token: generateToken(user.id),
    _id: user.id,
    username: user.username,
    email: user.email,
  });
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("All fields are required");
  }
  const user = await userModel.findOne({ email });
  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(200);
    res.json({
      token: generateToken(user.id),
      _id: user.id,
      username: user.username,
      email: user.email,
    });
  } else {
    res.status(400);
    throw new Error("invalid credentials");
  }
});

const getMe = asyncHandler(async (req, res) => {
  const user = await userModel.findById(req.user.id)
  res.status(200)
  res.json({
    _id: user._id,
    username: user.username,
    email: user.email
  })
});

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "3d",
  });
};

module.exports = { registerUser, loginUser, getMe };
