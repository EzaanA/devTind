const express = require("express");

const app = express();


app.use("/",(req,res)=>{
    res.send("Hello at 1");
});


app.use("/test" , (req,res)=>{
    res.send("Hello at test");
});

app.use("/brr",(req,res)=>{
    res.send("Hello at brr");
});


app.listen(7777, ()=>{
    console.log("Server stared successfully ") ; 
})