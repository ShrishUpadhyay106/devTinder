const mongoose = require("mongoose");
const validator= require("validator");
 const bcrypt= require('bcrypt');
const userSchema = new mongoose.Schema({
    firstName : {
        type: String,
        required: true,
        minLength:4,
    },
    lastName :{
        type: String,
    },
    emailId: {
        type: String,
        required: true,
        unique:true,
        lowercase:true,
          validate(value){
            if(!validator.isEmail(value)){
                throw new Error("invalid email address"+ value);
            }
          },
    },
    password: {
        type: String,
        required: true,
         validate(value){
            if(!validator.isStrongPassword(value)){
                throw new Error("enter the strong password");
            }
          },
    },
    age: {
        type: Number,
        min:18,
    },
    gender:{
        type: String,
        // it only run by default for new user only not for updation so you have to enable it for updation in update api
        validate(value){
            if(!["male","female"].includes(value)){
                throw new Error("gender data is insufficient");
            }
        },
    },
    photoUrl:{
        type: String,
        validate(value){
            if(!validator.isURL(value)){
                throw new Error("invalid url"+ value);
            }
          },
    },
    about :{
        type: String,
        default:"this is defult value "
    },
    skills:{
        // array of strings for skills
        type: [String],
    },
    
},
{
    timestamps:true
});

userSchema.methods.getJWT = async function () {
    const user = this ;
    const token = await jwt.sign({_id:user._id},"DEV@Tinder$123",{expiresIn:"1h"});

    return token;
}

userSchema.methods.validatePassword = async function(passwordByUser){
    const user = this;
    const passwordHash = user.password;

    const isPasswordValid = await bcrypt.compare(passwordByUser,passwordHash);
    return isPasswordValid;
}

const User = mongoose.model("User",userSchema);
module.exports= User;