const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/").then(()=> console.log("Connection started")).catch((e)=> console.log(e.message))
