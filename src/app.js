const express = require("express");
const connectDB  = require("./config/DB")
const app = express();
const User = require( "./models/userSchema");
const { validations } = require("./utils/validation");
const bcrypt= require("bcrypt")

app.use(express.json()) ;

app.post ("/signup" , async (req, res) =>{   
    try{
         // creating new isntance of user model
         validations(req)
         const { firstName , lastName, email , password} = req.body;
         const passwordhash = await bcrypt.hash ( password,  10)
         console.log(passwordhash)
         const user  = new User( {
            firstName,
            lastName,
            email,
            password : passwordhash
        })
        
        await user.save()
        res.send ("User added Successfully")
    }
    catch (err) {
        res.status(400).send("Error Saving while User data")
    }
 
  
})

app.post("/login" , async ( req, res) => {
    try{
        const {  email , password} = req.body

    }
    catch (err) {

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

app.patch( "/user/:user_id", async ( req, res) => {
    try{
        const allowedUpdates = ["age" , "about" , "gender" , "photoUrl" , "skills"]

        const isupdatesAllowed = Object.keys(req.body).every( s => allowedUpdates.includes(s))
    
        if ( !isupdatesAllowed) {
            throw new Error("Not Allowed ")
        }
        const user_id = req.params?.user_id ;
        const data = req.body
        console.log( data)

        if ( data?.skills.length > 10 ){
            throw new Error ( "skills should not be more than 10 ")
        }

        await User.findOneAndUpdate( {_id: user_id} , data)
        res.send("User updated successfully")
    }
    catch (err) {
        console.log( err)
        res.status(400).send(err.message || "Update Not Allowed ")
    }
})

connectDB().then ( () =>{
    console.log("connected to DB before you start your application server")
    app.listen( 7200 , ( ) => console.log("Connected to Server"))
}).catch ( err => {
    console.log("Some DB Connection issue")
})




 
