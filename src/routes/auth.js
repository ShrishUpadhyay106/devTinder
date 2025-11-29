const express = require("express");
const { validateSignUpdata } = require("../utility/validation");
const bcrypt= require('bcrypt');
const User = require("../models/user");
const validator= require("validator");

const authRouter = express.Router();

authRouter.post("/signup", async(req,res)=>{
try{
    validateSignUpdata(req)
    const{firstName,lastName,emailId,password}=req.body;
     const passwordHash= await bcrypt.hash(password,10);
     const users= new User({
      firstName,lastName,emailId,password: passwordHash,
    });
    await users.save();
    res.send("user added successfully");
}
 catch (err) {
    res.status(400).send("ERROR!" + err.message);
  }

});

authRouter.post("/login", async (req,res)=>{
  try{
    const{emailId,password}=req.body;
    if(!validator.isEmail(emailId)){
      throw new Error("invalid email formate");
    }
    else{
      const user= await User.findOne({emailId:emailId});
      if(!user){
        throw new Error("Invalid email id, not found");
      }
      // const isPasswordValid = await bcrypt.compare(password, user.password);
       const isPasswordValid = await user.validatePassword(password);

      if(isPasswordValid){
        //create a jwt token
        // const token = await jwt.sign({_id:user._id},"DEV@Tinder$123",{expiresIn:"1h"});
        // console.log(token);
        // another way to write 
        
        const token = await user.getJWT();

        // add token to cookie and send to the user
        res.cookie("token",token,{
          expires: new Date(Date.now()+8*360000),
        });

        res.send("Login Successfull!!");
      }
      else{
        throw new Error("password is incorrect");
      }
    }

  }
  catch(err) {
    res.status(400).send("ERROR!" + err.message);
  }
});


module.exports = authRouter;