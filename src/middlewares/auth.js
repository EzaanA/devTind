const adminAuth = (req,res,next)=>{
    const token  = "xyz";
    const isAuthorized = token === "xyz";
    if(!isAuthorized){
        res.status(401).send("Not Authorized");
    }
    else{
        next();
    }
}

const userAuth = (req,res,next) => {
    const token = "xyx";
    const isAuth = token === "xyx";
    if(!isAuth){
        res.status(401).send("Unauthorised access");
    }
    else{
        next();
    }
}

module.exports = {
    adminAuth,
    userAuth
}

