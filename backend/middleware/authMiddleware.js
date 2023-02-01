const jwt = require("jsonwebtoken");
const userModel = require("../models/usermodels");
const asyncHandler = require("express-async-handler");

const protected = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await userModel.findById(decoded.id).select("-password");

      next();
    } catch (error) {
      console.log(error);
      res.status(400);
      throw new Error('Unauthorized user')
    }
  }
  if (!token) {
    res.status(400);
    throw new Error('Unauthorized user, no token')
    }
  }
);

module.exports = { protected };
