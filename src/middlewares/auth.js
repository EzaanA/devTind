const  jwt = require('jsonwebtoken');
const User = require("../models/user")


const userAuth = async(req,res,next) => {
    // read the token from the req cookies 

    try{
        //retrieves the cookies so that users token can be verified

        const cookies = req.cookies;
        const {token} = cookies;// read the cookie & find the logged in user
        // console.log(cookies);

        // validate the token  
        if(!token){
            throw new Error("Invalid Token !!!");
        }
        //this is to verify whether or not the token is same or not 

        const decodedMessage = await jwt.verify(token , "DEV@TINDER$790");
        const {_id} = decodedMessage;
        // find the user
        const user = await User.findById(_id);
        if(!user){
            throw new Error("USER NOT FOUND");
        }
        req.user = user;
        // res.send(user);
        next();
    }
    catch(err){
        res.status(400).send({ error: err.message || "Something went wrong" });
    }
}

module.exports = {
    userAuth
}

