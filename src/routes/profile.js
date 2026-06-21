const express  = require("express");
const { userAuth } = require("./../middlewares/auth")


const User = require("./../models/userSchema")
const {validations , userValidation} =  require("./../utils/validation")
const bcrypt = require("bcrypt")

const profileRouter = express.Router()

profileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
    res.send(req.user);
  } catch (err) {
    res.status(400).send("Something went wrong");
  }
});

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    console.log("first")
    userValidation(req.body)
    console.log("after validation")
 
    const loggedinUser  = req.user
    Object.keys(req.body).forEach( k => loggedinUser[k] = req.body[k])
    const user = await loggedinUser.save()
    if ( user ){
      res.send(user)
    }
    else {
      throw new Error("")
    }
    
  } catch (err) {
    res.status(400).send("Something went wrong");
  }
});

module.exports = profileRouter; 


