const express = require("express");
const connectDB  = require("./config/DB")
const app = express();
const User = require( "./models/userSchema")

app.post ("/signup" , async (req, res) =>{
    const userData  = { firstName : "dhoni" , lastName:'ms' , email:"dhoni@gmail.com", password:"hello"}
    // creating new isntance of user model
    const user  = new User( userData)
    try{
        await user.save()
        res.send ("User added Successfully")
    }
    catch (err) {
        res.status(400).send("Error Saving while User data")
    }
  
})

connectDB().then ( () =>{
    console.log("connected to DB before you start your application server")
    app.listen( 7200 , ( ) => console.log("Connected to Server"))
}).catch ( err => {
    console.log("Some DB Connection issue")
})




 
