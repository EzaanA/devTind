const express = require("express");
const {connectDB} = require("./config/database");
const app = express();
const User = require("./models/user")
const { validationSignUp } = require("./utils/validation");
const bcrypt = require("bcrypt");
//so in order to read the cookie we need a middleware known as cookie parser
const cookieParser = require("cookie-parser");
const jwt = require('jsonwebtoken');
const {userAuth}  = require('./middlewares/auth');

app.use(express.json()); // this is to convert/Parse js object to JSON for all the post req data being sent 
app.use(cookieParser());


//som i've validated the token for profile & login while a user should only get access to all apis if hes logged in so to do it we use 0auth 



app.post("/signup" , async (req,res)=>{
    try{
        //will check whether signup content is valid or not
        await validationSignUp(req);
        const {firstName ,lastName,email,phoneNo,age,password,gender,photoURL,about,skills} = req.body;
        // console.log(password);
        // const passwordHash = await bcrypt?.hash(password,10);
        //password is hashed here using bcrypt;
        const hashedPassword = await bcrypt?.hash(password,10);
        // console.log(hashedPassword);
        const user = new User({
            firstName,
            lastName,
            email,
            phoneNo,
            age,
            password : hashedPassword ,
            gender,
            photoURL,
            about,
            skills
        });
            await user.save();
            res.send("User added successfully");
        }
        catch(err){
            res.status(404).send({ error: err.message || "Something went wrong" });
        }
});

app.post("/login" , async(req,res)=>{
    try{
        const {email , password} = req.body;
        const user = await User.findOne({email : email});
        // console.log(user);
        if(!user){
            throw new Error('Invalid user');
        }

        const isPassValid = await bcrypt.compare(password , user.password);
        // console.log(isPassValid);
        // console.log(password + "," + user.password);
        if(isPassValid){
            //create a jwt token
            const token = await jwt.sign({_id : user._id} , "DEV@TINDER$790");
            console.log(token);

            //sent a dummie cookie to the user 
            res.cookie("token" , token ,{
                expires : new Date(Date.now() + 8 * 3600000 ) 
            });

            res.send("Login Succcessfull");
        }
        else{
            throw new Error("Invalid Credentials")
        }

    }
    catch(err){
        res.status(404).send({ error: err.message || "Something went wrong" });
    }
})


app.get("/profile" ,userAuth , async(req ,res)=>{
    try{
       
        const user = req.user;
        // console.log(user);
        res.send(user);

    }
    catch(err){
        res.status(404).send({ error: err.message || "Something went wrong" });
    }
});






connectDB()
.then(()=>{
    console.log("DB Connected successfully");
    app.listen(7777,()=>{
        console.log("Server stared successfully ")
    })
})
.catch((err)=>{
    console.log(err);
});

// app.listen(7777, ()=>{
//     console.log("Server stared successfully ") ; 
// })