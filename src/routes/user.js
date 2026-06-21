const express = require("express")
const userRouter = express.Router()
const { userAuth } = require("./../middlewares/auth")

userRouter.get( "/connections", userAuth , async (req, res) =>{

})


module.exports = userRouter ;