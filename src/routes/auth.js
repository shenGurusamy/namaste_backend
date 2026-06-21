const express  = require("express");
const authRouter = express.Router()
const User = require("./../models/userSchema")
const validations =  require("./../utils/validation")
const bcrypt = require("bcrypt")


authRouter.post("/signup", async (req, res) => {
    try {
      // creating new isntance of user model
      validations(req);
      const { firstName, lastName, email, password } = req.body;
      const passwordhash = await bcrypt.hash(password, 10);
      console.log(passwordhash);
      const user = new User({
        firstName,
        lastName,
        email,
        password: passwordhash,
      });
  
      await user.save();
      res.send("User added Successfully");
    } catch (err) {
      res.status(400).send("Error Saving while User data");
    }
  });
  
  authRouter.post("/login", async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      console.log("USer data ", user);
      if (!user) {
        console.log(" indeide !user");
        throw new Error(" Invalid Credentials");
      }
  
      const compare = user.comparePassword(password);
      console.log(user.password, password, compare);
      if (!compare) {
        throw new Error(" Invalid Credentials");
      } else {
        console.log(compare);
  
        //const token = jwt.sign({ _id: user._id }, 'shhhhh' , { expiresIn: '1d'});
        const token = await user.getJWT();
        res.cookie("token", token);
        res.send("Login Successfull");
      }
    } catch (err) {
      res.status(404).send(err.message);
    }
  });

  module.exports = authRouter; 