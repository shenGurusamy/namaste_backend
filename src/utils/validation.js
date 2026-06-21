const validator   = require("validator")
const validations = ( req ) =>{
    const { firstName, lastName, email } = req.body

    // if ( !firstName || !lastName) {
    //     throw new Error( "Name is missing")
    // }
    // else if ( !validator.isEmail( email)){
    //     throw new Error( "Please check your EMail ")
    // }


}

module.exports = { validations }

