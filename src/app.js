// console.log("starting a new project");
const express = require("express");
const connectDb = require("./config/database");
const cookieparser= require("cookie-parser");
const app = express();


app.use(express.json());
app.use(cookieparser());

const authRouter= require("./routes/auth");
const profileRouter= require("./routes/profile");
const requestRouter=require("./routes/requests");

app.use("/",authRouter);
app.use("/",profileRouter);
app.use("/",requestRouter);

// app.patch("/user/:userId", async (req, res) => {
//   const userId = req.params?.userId;
//   const data = req.body;
  
//   try {
//     const ALLOWED_UPADTES = ["age", "gender", "skills", "photourl","password"];

//   const isUpdateAllowed = Object.keys(data).every((k) =>
//     ALLOWED_UPADTES.includes(k)
//   );
//   if (!isUpdateAllowed) {
//     throw new Error("Upadate not allowed");
//   }
//   if(data?.skills?.length>=10){
//     throw new Error("skills more than 10 not allowed");
//   }
//      if (data.password) {
//       data.password = await bcrypt.hash(data.password, 10);
//     }
//     const user= await User.findByIdAndUpdate({ _id: userId }, data, {
//       returnDocument: "after",
//       runValidators: true,
//     });
  
//     console.log(user);
//     res.send("updated successfully");
//   } catch (err) {
//     res.status(400).send("update failed " + err.message);
//   }
// });



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
