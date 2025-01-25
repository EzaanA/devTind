const express = require("express");
const {connectDB} = require("./config/database");

const app = express();
const User = require("./models/user")


// app.post("/" , (req,res)=>{
//     res.send("Helap ")
// })

app.use(express.json());

app.post("/signup" , async (req,res)=>{
    const user = new User(req.body);
        
        try{
            await user.save();
            res.send("User added successfully");
        }
        catch(err){
            res.status(404).send("some error occured");
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
    console.log("Something went wrong");
});

// app.listen(7777, ()=>{
//     console.log("Server stared successfully ") ; 
// })