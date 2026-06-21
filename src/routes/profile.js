const express  = require("express");
const { userAuth } = require("./../middlewares/auth")


const User = require("./../models/userSchema")
const validations =  require("./../utils/validation")
const bcrypt = require("bcrypt")

const profileRouter = express.Router()

profileRouter.get("/profile", userAuth, async (req, res) => {
  try {
    res.send(req.user);
  } catch (err) {
    res.status(400).send("Something went wrong");
  }
});

module.exports = profileRouter; 


