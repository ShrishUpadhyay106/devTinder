const express = require("express");
const requestRouter = express.Router();
const {userAuth} = require("../middlewares/auth");

requestRouter.post("/sendConnectionRequest", userAuth ,async(req,res)=>{
   console.log("sending a connection request");
    const user= req.user;
   res.send(user.firstName + " sent the coonection request");
});

module.exports = requestRouter;