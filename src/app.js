// console.log("starting a new project");
const express = require("express");
const connectDb = require("./config/database");
const app = express();
const User = require("./models/user");
app.use(express.json());
// for specific one user
app.get("/user", async (req, res) => {
  try {
    //   const users= await User.find({emailId:req.body.emailId});
    // if(users.length ===0){
    //   res.status(404).send("user not found");
    // }
    // else{
    //   res.send(users);
    // }

    // if two users with same emailId
    const users = await User.findOne({ emailId: req.body.emailId });
    res.send(users);
  } catch (err) {
    res.status(400).send("something went wrong ");
  }
});

// for all users.
app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});
    if (users.length === 0) {
      res.status(404).send("user not found");
    } else {
      res.send(users);
    }
  } catch (err) {
    res.status(400).send("something went wrong ");
  }
});

app.delete("/user", async (req, res) => {
  try {
    const userid = req.body.userId;
    const user = await User.findByIdAndDelete({ _id: userid });
    res.send("user delete succesfully");
  } catch (err) {
    res.status(400).send("something went wrong ");
  }
});

app.patch("/user/:userId", async (req, res) => {
  const userId = req.params?.userId;
  const data = req.body;
  
  try {
    const ALLOWED_UPADTES = ["age", "gender", "skills", "photourl"];

  const isUpdateAllowed = Object.keys(data).every((k) =>
    ALLOWED_UPADTES.includes(k)
  );
  if (!isUpdateAllowed) {
    throw new Error("Upadate not allowed");
  }
  if(data.skills.length>=10){
    throw new Error("skills more than 10 not allowed");
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

app.post("/signup", async (req, res) => {
  const users = new User(req.body);
  try {
    await users.save();
    res.send("user added successfully");
  } catch (err) {
    res.status(400).send("error saving the data " + err.message);
  }
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
