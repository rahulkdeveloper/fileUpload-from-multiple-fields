const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/nodetask")
.then(()=>{
    console.log("mongodb connect..")
}).catch((err)=>{
    console.log("err",err)
})