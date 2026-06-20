const express = require("express");
const connectDB  = require("./config/DB")
const app = express();
const User = require( "./models/userSchema")

app.use(express.json()) ;

app.post ("/signup" , async (req, res) =>{
     
   
   
    try{
         // creating new isntance of user model
        const user  = new User( req.body)
        await user.save()
        res.send ("User added Successfully")
    }
    catch (err) {
        res.status(400).send("Error Saving while User data")
    }
 
  
})

app.get("/feed" , async (req,res) =>{
    try{
        const users = await User.find({})
        if ( users.length == 0) {
            res.status(404).send("No user Found")
        }
        else {
            res.send ( users )
        }
    }
    catch (err) {
        res.status(404).send("No user Found")
    }
})

app.get("/user" , async(req, res) =>{
    const emailId = req.body.email
    console.log(emailId )
    try{
        // querrying Model  
        const user = await User.findOne( )
        if ( user.length == 0){
            res.status(404).send("User not found")
        }
        res.send (user )
    }
    catch (err) {
        res.status(400).send("Something went wrong")
    }
})

app.delete ( "/user" , async (req, res) => {
    
    try{
        const email = req.body.email

        await User.findOneAndDelete ( { email })
        res.send( "Deleted Successfully")
    }
    catch (err) {

    }
})

connectDB().then ( () =>{
    console.log("connected to DB before you start your application server")
    app.listen( 7200 , ( ) => console.log("Connected to Server"))
}).catch ( err => {
    console.log("Some DB Connection issue")
})




 
