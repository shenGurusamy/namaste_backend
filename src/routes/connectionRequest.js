const express  = require("express")
const { userAuth } = require("./../middlewares/auth")
const requestRouter = express.Router()

requestRouter.post("/sendConnectionRequest", userAuth, async (req, res) => {
    try {
      if (!req.user) throw new Error("Please login");
      res.send(`${req.user.firstName} sent a Connection Request`);
    } catch (err) {
      res.status(400).send("Something went wrong");
    }
  });

  module.exports= requestRouter ; 