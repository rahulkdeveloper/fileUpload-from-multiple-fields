const express = require("express");
const port = process.env.PORT || 7000;
const app = express();
require("./config/db");
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());




const user = require("./router/user");

app.use("/user",user)



app.listen(port, ()=>{
    console.log("server is running.....")
})

