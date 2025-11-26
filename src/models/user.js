const mongoose = require("mongoose");
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
    },
    password: {
        type: String,
        required: true,
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