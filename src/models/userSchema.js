const mongoose = require("mongoose") ;
var validator = require('validator');
const bcrypt = require("bcrypt")
const  jwt = require('jsonwebtoken');

 const userSchema = new mongoose.Schema({
    firstName :{
        type:String,
        required: true,
        index: true,
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
        enum :{
            values :["male", "female","others"],
            message : `{values} is not supported`
        }
        
        // validate(value) {
        //     if ( !["male", "female" , "others"].includes(value)){
        //         throw new Error("Gender value is invalid")
        //     }
        // }
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

 userSchema.methods.getJWT = async function ( ) {
    const user = this ; 
    const token = await jwt.sign({ _id: user._id }, 'shhhhh' , { expiresIn: '1d'}); 
    console.log(token)
    return token
 }
 userSchema.methods.comparePassword = async function (passwordInput) {
    const user = this ;
    const passwordhash = user.password 
    const isPasswordValid = await bcrypt.compare( passwordInput, passwordhash )
    return isPasswordValid
    
 }

 //Mongoose Model should start in Upper case letter
 //const User = mongoose.model( 'User' , userSchema)

 module.exports = mongoose.model( 'User' , userSchema);