// console.log("starting a new project");
const express= require('express');
const app = express();

// /ab,/abc


// app.get("/user/:userid/:name",(req,res)=>{
//     console.log(req.params);
//     res.send({firstName:"shrish", lastName:"upadhyay"});
// });


// app.get("/user",(req,res)=>{
//     console.log(req.query);
//     res.send({firstName:"shrish", lastName:"upadhyay"});
// });

app.use( "/user",
     [(req,res,next)=>{
    // res.send('hello from the  dahsboard server');
    next();
     },
    (req,res,next)=>{
    // res.send('hello from the  dahsboard server');
    next();
     }],
      (req,res,next)=>{
    res.send('hello from the  dahsboard server');
    
      }

);

app.listen(3000 ,()=>{
    console.log("server is sucessfully listeing on the port 3000")
});