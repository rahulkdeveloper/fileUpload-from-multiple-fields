const mongoose = require("mongoose");

const userDetailsSchema = new mongoose.Schema({

    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    dob:{
        type:Date,
        required:true
    },
    residentialAddress:{
       street1:{
        type:String,
        required:true
       },
       street2:{
        type:String,
        required:true
       }
    },

    parmanentAddress:{
        street1:{
         type:String,
        },
        street2:{
         type:String,
        }
     },
    documents:[{
        fileName:String,
        fileType:String,
        file:String
    }],
    submitAt:{
        type:Date,
        default:Date.now
    }
    
})

const userDetail = mongoose.model("userDetail",userDetailsSchema);

module.exports = userDetail


