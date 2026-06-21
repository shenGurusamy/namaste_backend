const mongoose = require("mongoose") ;
var validator = require('validator');

 const userSchema = new mongoose.Schema({
    firstName :{
        type:String,
        required: true,
        minLength : 3,
        maxLength : 50
    },
    lastName :{
        type:String,
        required: true,
    },
    email :{
        type:String,
        required:true,
        unique:true,
        validate(value) {
            if ( !validator.isEmail( value)) {
                throw new Error (" Invalid email , please check ")
            }
        }
    },
    password :{
        type:String,
        required:true
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
        type:Number,
        min:18
    },
    about:{
        type:String,
        default: " ABout your"
    },
    photoUrl : {
        type: String,
        default:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTe1PgY5lkq6ejgE-B1vF-9Gjcm_ZIPWtKL9NrRBMpdtg&s=10"
    },
    skills :{
        type : [String]
    }
 } , { 
    timestamps : true
 })

 //Mongoose Model should start in Upper case letter
 //const User = mongoose.model( 'User' , userSchema)

 module.exports = mongoose.model( 'User' , userSchema);