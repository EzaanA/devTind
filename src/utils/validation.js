const validator = require("validator")

const validationSignUp = async(req) =>{
    const{firstName , lastName , email , password,skills} = await req.body;
    // console.log('firstName');
    
    if(firstName.length < 1  || !firstName || !lastName){
        throw new Error("Firstname or Lastname not correct")
    }
    else if(!validator.isEmail(email)){
        throw new Error("Invalid Email " + email);
    }
    else if(!validator.isStrongPassword(password)){
        throw new Error("Not a strong password . Required Fields minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1");
    }
    else if(skills?.length > 10){
        throw new Error("Skills section cannot have more than 10 skills");
    }
}

module.exports = {
    validationSignUp
}