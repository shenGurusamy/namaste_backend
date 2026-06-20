const express = require("express");
const { adminAuth, userAuth } = require("./middlewares/auth")

const app = express();

app.use ("/admin" , adminAuth)

app.use("/user/login", ( req, res, next ) => {
    
    res.send (" { firstName: 'xxx', lastName: 'yyy' }  Login Success") ; 
}  )
app.use ( "/user"  , userAuth ) 
app.use ( "/user/getAll" , ( req , res, next ) => {
    res.send(" All users retireved from DBs")
})

app.use (  (   req, res, next) => {
    
    const err =new Error ( ` nott found ${req.originalUrl}`)
    err.statusCode = 404
    next(err)

})



// Always have this at the end so that if something misses try catch it will handled here
app.use ( ( err, req, res, next) => {
    const status  = err.statusCode  || 500 
    const mess = err.message || " something went wrong"
    res.status( status).send( mess )
})

 

app.listen(7200, () => {
  console.log("Listening at 7200");
});

 