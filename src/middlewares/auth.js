const cookieParser = require("cookie-parser");
const  jwt = require("jsonwebtoken");
const User = require("../models/userSchema");

 
const adminAuth = ( req, res, next) => {
    const token = "xyz1" ;
    let isToken = token === "xyz"
    if ( isToken) {
        next()
    }
    else {
        res.status(401).send('unAuthorised')
    }

}

const userAuth = async (req, res, next) => {
     try{
        const {token} = req.cookies
        const decoded = await jwt.verify( token , 'shhhhh') ; 
        const { _id} = decoded
        const user = await User.findById( { _id})
        if ( !user) {
            throw new Error ( "Invalid token, please login again")
        }
        req.user = user
        next ();
     }
     catch (err){
        res.status(400).send("Please Login")
     }
}

module.exports = {
    adminAuth,
    userAuth
}