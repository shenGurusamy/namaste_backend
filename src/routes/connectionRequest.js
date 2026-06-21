const express = require("express");
const { userAuth } = require("./../middlewares/auth");
const Connection = require("./../models/connectionRequestSchema");
const User = require("./../models/userSchema");
const requestRouter = express.Router();

requestRouter.post("/sendConnectionRequest", userAuth, async (req, res) => {
  try {
    if (!req.user) throw new Error("Please login");
    res.send(`${req.user.firstName} sent a Connection Request`);
  } catch (err) {
    res.status(400).send("Something went wrong");
  }
});

requestRouter.post(
  "/request/send/:status/:touserId",
  userAuth,
  async (req, res) => {
    try {
      let allowedStatus = ["interested", "ignored"];

      const fromUserId = req.user._id;
      const toUserId = req.params.touserId;
      const toUser = await User.findById(toUserId);

      if (!toUser) {
        return res.status(404).json({ message: "to user not found " });
      }

      const status = req.params.status;
      let isAllowedStatus = allowedStatus.includes(status);

      if (fromUserId == toUserId) {
        throw new Error("from and to USers are same ");
      }

      if (!isAllowedStatus) {
        throw new Error("Invalid Status type");
      }

      const existingReq = await Connection.findOne({
        $or: [
          {
            fromUserId,
            toUserId,
          },
          {
            fromUserId: toUserId,
            toUserId: fromUserId,
          },
        ],
      });
      if (existingReq) {
        throw new Error(" Connection request is already sent");
      }
      const conn = new Connection({
        fromUserId,
        toUserId,
        status,
      });

      const response = await conn.save();
      res.send(`connection request sent successfully ${response}`);
    } catch (err) {
      res.status(400).send(err.message || "Something went wrong");
    }
  }
);

requestRouter.post(
  "/request/send/:status/:requestid",
  userAuth,
  async (req, res) => {
     

    const loggedinUser = req.user;
    const { status, requestid } = req.params;

    const allowedStatus = ["accepted", "rejected"];

    if (allowedStatus.includes(status)) {
      return res.status(404).json({ message: `${status} is invalid` });
    }

    const connectionRequest = await Connection.findOne({
      _id: requestid,
      toUserId: loggedinUser._id,
      status: "interested",
    });
    if (!connectionRequest) {
      return res.status(404).json({ message: "Connection Request not found" });
    }

    connectionRequest.status = status;
    const data = await connectionRequest.save();

    if (data) {
      res.json({ message: `connection request ${status} ${data}` });
    } else {
      res.status(404).json({ message: "Retry " });
    }
  }
);

module.exports = requestRouter;
