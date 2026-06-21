const validator   = require("validator")
const { all } = require("../routes/auth")
const validations = ( req ) =>{
    const { firstName, lastName, email } = req.body

    if ( !firstName || !lastName) {
        throw new Error( "Name is missing")
    }
    else if ( !validator.isEmail( email)){
        throw new Error( "Please check your EMail ")
    }


}

const userValidation = ( req ) => {

    const allowedFields = ["firstName" , "lastName", "about", "age", "skills" , "gender"]
    console.log(req)

    const isallowedfields = Object.keys(req).every( key => allowedFields.includes(key))
    console.log(isallowedfields)
    if ( !isallowedfields) {
        throw new Error( "check all the fields")
    }
}

module.exports = { validations, userValidation }

