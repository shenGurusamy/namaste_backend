const express = require("express")
const userRouter = express.Router()
const { userAuth } = require("./../middlewares/auth")
const Connection = require("./../models/connectionRequestSchema")

userRouter.get( "/connections", userAuth , async (req, res) =>{

})
userRouter.get( "/user/request/received", userAuth , async (req, res) =>{
    //get all the pedning connection Request for the logged in User
    try{
        const loggedUser = req.user ; 
        const connectionRequest = await Connection.find( { 
            toUserId : loggedUser._id,
            status : "interested"
        } ).populate( "fromUserId" , ["firstName" , "lastName", "about" , "gender" ,"photoUrl"])
        
        if ( connectionRequest.length) {
            res.send(connectionRequest)
        }
        else{
            res.send(`No pending request`)
        }
    }
    catch(err){
        res.status(400).send(err.message)
    }
})


module.exports = userRouter ;