const mongoose = require("mongoose")
const validator = require("validator")


const userSchema = new mongoose.Schema({
    firstName : {
        type:String,
        required : true
    },
    lastName : {
        type : String,
    },
    email : {
      type : String , 
      required : true,
      unique : true,
      trim  : true,  
      lowercase : true,

    //   validate(value){
    //         if(!validator.isEmail(value)){
    //             throw new Error("Invalid Email" + value);
    //         }
    //   }
    },

    phoneNo : {
        type : Number,
        min : 10,
        // max : 10,
        required : true,
        unique : true
    } ,
    age: {
        type:Number,
        required : true
    },
    password : {
        type:String,
        required : true,
    //     validate(value){
    //         if(!validator.isStrongPassword(value)){
    //                 throw new Error("Not a strong password . Required Fields minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1");
    //             }
    // }
    },
    gender : {
        type : String,
      required : true,
        validate(value){
            if(!["male", "female" , "other"].includes(value)){
                throw new Error("gender data is not valid");
            }
        }
    },
    
    photoURL : {
        type : String,
        default : "https://img.freepik.com/premium-vector/account-icon-user-icon-vector-graphics_292645-552.jpg?semt=ais_hybrid",
    } , 

    about : {
        type : String, 
        default : "HELLO THIS IS USER",
        //this type of validation is known as db level Validation 
        validate(value){
            const forbdWord = ["fuck" , "dick" , "ass" , "asshole"];
            for(let word of forbdWord){
                if(value.includes(word)){
                    throw new Error("NO CUSS WORDS ALLOWED");
                }
        }
        }
    },
     skills : {
        type : [String],
     }
},
{
    timestamps : true
}
);

module.exports  = mongoose.model("User",userSchema);