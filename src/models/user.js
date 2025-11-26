const mongoose = require("mongoose");
const validator= require("validator");
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

const User = mongoose.model("User",userSchema);
module.exports= User;