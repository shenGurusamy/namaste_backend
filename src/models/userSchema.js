const mongoose = require("mongoose") ;

 const userSchema = new mongoose.Schema({
    firstName :{
        type:String
    },
    lastName :{
        type:String
    },
    email :{
        type:String
    },
    password :{
        type:String
    },
    gender :{
        type:String
    },
    age :{
        type:Number
    },
 })

 //Mongoose Model should start in Upper case letter
 //const User = mongoose.model( 'User' , userSchema)

 module.exports = mongoose.model( 'User' , userSchema);