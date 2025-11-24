// console.log("starting a new project");
const express= require('express');
const connectDb = require("./config/database");
const app = express();
const User= require("./models/user");
// app.use(express.json());



app.post("/signup",async(req,res)=>{
  const users= new User({
    firstName: "shrish",
    lastName: "upadhyay",
    emailId:"gfhghjb",
    password: "avbvs",
    age: 22,
  });
  try{
     await users.save();
 res.send("user added successfully");
  }
  catch(err){
    res.status(400).send('error saving the data '+ err.message);
  }
});

connectDb().then(()=> {
    console.log("database connection established");
    app.listen(3000 ,()=>{
    console.log("server is sucessfully listeing on the port 3000")
});
}).catch(err=>{
  console.error("database cannot be connected!!")
});



