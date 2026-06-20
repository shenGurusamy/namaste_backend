const mongoose = require("mongoose") ;

 const userSchema = new mongoose.Schema({
    firstName :{
        type:String,
        required: true
    },
    lastName :{
        type:String
    },
    email :{
        type:String,
        unique:true,
    },
    password :{
        type:String
    },
    gender :{
        type:String,
        validate(value) {
            if ( !["male", "female" , "others"].includes(value)){
                throw new Error("Gender value is invalid")
            }
        }
    },
    age :{
        type:Number
    },
 })

 //Mongoose Model should start in Upper case letter
 //const User = mongoose.model( 'User' , userSchema)

 module.exports = mongoose.model( 'User' , userSchema);