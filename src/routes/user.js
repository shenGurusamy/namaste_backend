const express = require("express")
const userRouter = express.Router()
const { userAuth } = require("./../middlewares/auth")
const Connection = require("./../models/connectionRequestSchema")

const USER_SAFE_DATA ="firstName lastName gender about photoUrl"

userRouter.get( "/user/connections", userAuth , async (req, res) =>{
    try{
        const loggedinUser = req.user
        const connectionList = await Connection.find( {
            $or:[
                {
                    toUserId: loggedinUser._id ,status :"accepted"
                },
                {
                    fromUserId: loggedinUser._id ,status :"accepted"
                }
            ]
            
        }).populate( "fromUserId"  , USER_SAFE_DATA)
        const data = connectionList.map( row => row.fromUserId)
        if ( data.length) {
            res.send(data)
        }
        else{
            res.send(`No pending request`)
        }

    }
    catch(err){
        res.status(400).send(err.message)
    }
})
userRouter.get( "/user/request/received", userAuth , async (req, res) =>{
    //get all the pedning connection Request for the logged in User
    try{
        const loggedUser = req.user ; 
        const connectionRequest = await Connection.find( { 
            toUserId : loggedUser._id,
            status : "interested"
        } ).populate( "fromUserId" , USER_SAFE_DATA)
        
        const data = connectionRequest.map ( row => row.fromUserId)
        if ( data.length) {
            res.send(data)
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