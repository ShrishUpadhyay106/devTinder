// console.log("starting a new project");
const express= require('express');
const app = express();

app.use( "/user", (req,res)=>{
    res.send('hello from the  dahsboard server')
});

app.get("/user",(req,res)=>{
    res.send({firstName:"shrish", lastName:"upadhyay"});
});

app.post("/user",(req,res)=>{
    res.send("data successfully saved to the database");
});

app.delete("/user",(req,res)=>{
    res.send("data deleted successfully");
});

// this will match all the http method API call to/test
// app.use( "/test", (req,res)=>{
//     res.send('hello from the  dahsboard server')
// });
app.use( "/", (req,res)=>{
    res.send('hello from the server')
});




// /ab,/abc


// app.get("/abc",(req,res)=>{
//     res.send({firstName:"shrish", lastName:"upadhyay"});
// });
app.listen(3000 ,()=>{
    console.log("server is sucessfully listeing on the port 3000")
});