// console.log("starting a new project");
const express = require("express");
const connectDb = require("./config/database");
const {validateSignUpdata}= require("./utility/validation");
const bcrypt= require('bcrypt');
const validator= require("validator");
const cookieparser= require("cookie-parser");
const jwt =require("jsonwebtoken");
const {userAuth} = require("./middlewares/auth");

const app = express();
const User = require("./models/user");
app.use(express.json());
app.use(cookieparser());




app.post("/login", async (req,res)=>{
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


app.post("/signup", async (req, res) => {
  try {
      // validation is required 
   validateSignUpdata(req);
  
    const{firstName,lastName,emailId,password}=req.body;
    // encrypting password
    const passwordHash= await bcrypt.hash(password,10);

 // const users = new User(req.body); not best way to access the body
    const users= new User({
      firstName,lastName,emailId,password: passwordHash,
    });
    await users.save();
    res.send("user added successfully");
  } catch (err) {
    res.status(400).send("ERROR!" + err.message);
  }
});

app.get("/profile",userAuth,async(req,res)=>{
 try{
   const  user= req.user;
    res.send(user);
 } catch(err) {
    res.status(400).send("ERROR!" + err.message);
  }
});
app.patch("/user/:userId", async (req, res) => {
  const userId = req.params?.userId;
  const data = req.body;
  
  try {
    const ALLOWED_UPADTES = ["age", "gender", "skills", "photourl","password"];

  const isUpdateAllowed = Object.keys(data).every((k) =>
    ALLOWED_UPADTES.includes(k)
  );
  if (!isUpdateAllowed) {
    throw new Error("Upadate not allowed");
  }
  if(data?.skills?.length>=10){
    throw new Error("skills more than 10 not allowed");
  }
     if (data.password) {
      data.password = await bcrypt.hash(data.password, 10);
    }
    const user= await User.findByIdAndUpdate({ _id: userId }, data, {
      returnDocument: "after",
      runValidators: true,
    });
  
    console.log(user);
    res.send("updated successfully");
  } catch (err) {
    res.status(400).send("update failed " + err.message);
  }
});

app.post("/sendConnectionRequest", userAuth ,async(req,res)=>{
   console.log("sending a connection request");
    const user= req.user;
   res.send(user.firstName + " sent the coonection request");
});

connectDb()
  .then(() => {
    console.log("database connection established");
    app.listen(3000, () => {
      console.log("server is sucessfully listeing on the port 3000");
    });
  })
  .catch((err) => {
    console.error("database cannot be connected!!");
  });
