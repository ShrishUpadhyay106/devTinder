const mongoose = require("mongoose");
const connectDb = async () =>{
    await mongoose.connect("mongodb+srv://shrishupadhyay:ddMxXuWM4%23epjBg@namastenode.zzzj8sb.mongodb.net/devTinder");

};

module.exports = connectDb;
