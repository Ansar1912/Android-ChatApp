
var jwt = require('jsonwebtoken');
require('dotenv').config();
const jwt_secret=process.env.JWT_SECRET

const fetchUser=(req,res,next)=>{
    let userToken = req.header("authToken");
    if (!userToken) {
        res.status(401).send({ errors: "Token Not Found" })
    }
    try{
        let dataJWT=jwt.verify(userToken,jwt_secret)
        req.user = dataJWT.user
        next()
    }
    catch{
        res.status(401).send({ errors: "Not A Valid Token" })
    }
}

module.exports = fetchUser;