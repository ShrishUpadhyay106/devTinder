// console.log("starting a new project");
const express= require('express');
const app = express();
app.use( "/", (req,res)=>{
    res.send('hello from the  dahsboard server')
});
app.use( "/test", (req,res)=>{
    res.send('hello from the server')
});
app.listen(3000 ,()=>{
    console.log("server is sucessfully listeing on the port 3000")
});