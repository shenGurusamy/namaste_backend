const connectURI ="mongodb+srv://rjpmpandian:Wish6606@cluster0.h5sm4.mongodb.net/nodejs"

 const mongoose = require('mongoose')

 async function connectDB  (){
    await mongoose.connect( connectURI )
 }
 
 module.exports = connectDB