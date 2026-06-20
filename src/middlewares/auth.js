
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

const userAuth = (req, res, next) => {
    const token = "xyz1"
    const usertoken = token === "xyz"

    if ( usertoken) {
        next()
    }else {
        res.status(401).send("User unauthorized")
    }
}

module.exports = {
    adminAuth,
    userAuth
}