const mongoose = require("mongoose") ;

 const userSchema = new mongoose.Schema({
    firstName :{
        type:String,
        required: true,
        minLength : 3,
        maxLength : 50
    },
    lastName :{
        type:String
    },
    email :{
        type:String,
        required:true,
        unique:true,
    },
    password :{
        type:String,
        required:true
    },
    gender :{
        type:String,
        required:true,
        validate(value) {
            if ( !["male", "female" , "others"].includes(value)){
                throw new Error("Gender value is invalid")
            }
        }
    },
    age :{
        type:Number,
        min:18
    },
 } , { 
    timestamps : true
 })

 //Mongoose Model should start in Upper case letter
 //const User = mongoose.model( 'User' , userSchema)

 module.exports = mongoose.model( 'User' , userSchema);