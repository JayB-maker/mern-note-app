const jwt = require("jsonwebtoken");
const userModel = require("../models/usermodels");

const protected = async (res, req, next) => {
  let token;

  if (
    req.headers.authentication &&
    req.headers.authentication.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authentication.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await userModel.findById(decoded.id).select("-password");

      next();
    } catch (error) {
      console.log(error);
      res.status(400);
      res.json("unauthorized user");
    }
  }
  if (!token) {
    res.status(400);
    res.json("unauthorized user, no token");
  }
};

module.exports = { protected };
