const { response } = require("express");
const { request } = require("http");
const userDetail = require("../model/userDetails");
const path = require("path");
const multer = require("multer");
const { ageValid } = require("../helper/helper");
const fs = require("fs");

async function deleteFiles(locations){
  
    for (const x of locations) {
      
        
        let  filePath = `${x.path}`; 
                fs.unlink(filePath,()=>{});
    }
  
}

async function saveFiles(docDetails,files){
   
    let res = [];


    let returnObj = {error:null,data:[]}

    for (let i = 0; i < docDetails.length; i++) {

        
        let fileExt = files[i].mimetype.split("/")[1];

        if(!docDetails[i].fileName || docDetails[i].fileName == "" || !docDetails[i].fileType || docDetails[i].fileType == ""){
            returnObj["error"] = `all field are required`
            break
        }
      
        if(docDetails[i].fileType !=fileExt){
            returnObj["error"] = `invalid file type for ${docDetails[i].fileType} fileType`
            break
        }
        let object = {...docDetails[i]};
            object["file"] = files[i].path;
            res.push(object);
        
    }

    if(res.length == files.length){
        returnObj["data"] = res;
        return returnObj
    }
    else{
        
        await deleteFiles(files);
        returnObj["data"] = res
        return returnObj

    }
   
    
}



exports.uploadDetails = async (request, response) => {
    try {

        let { firstName, lastName, email, dob, residentAdd_street1, residentAdd_street2, isSameResAdd = false, permenantAdd_street1, permenantAdd_street2, documents } = request.body;

        

        isSameResAdd = (isSameResAdd == "true"?true:false)

        
        
        

        let {isAgeValid,message} = await ageValid(dob,18)
        if(!isAgeValid){
            return response.json({
                success: false,
                message: message
            })
        }

        if (!isSameResAdd) {
            if (!permenantAdd_street1 || permenantAdd_street1=="" || !permenantAdd_street2|| permenantAdd_street2 == "") {
                return response.json({
                    success: false,
                    message: "all field are required"
                })
            }
          
        }
        else {
            permenantAdd_street1 = residentAdd_street1;
            permenantAdd_street2 = residentAdd_street2
        }




        let obj = {
            firstName,
            lastName,
            email,
            dob,
            residentialAddress: {
                street1: residentAdd_street1,
                street2: residentAdd_street2
            },
            parmanentAddress: {
                street1: permenantAdd_street1,
                street2: permenantAdd_street2
            },
            documents: []
        }

        if(documents.length<2 || request.files.length<2){
            return response.status(400).json({
                success: false,
                message: "minimum two documents are required"
            })
        }

        if(documents.length>1){
            documents = JSON.parse(JSON.stringify(documents));

            let files = request.files;
            

            let {error,data} = await saveFiles(documents,files);

            if(error){
             
                return response.status(400).json({
                    success: false,
                    message: error
                })
            }
           
            
            obj["documents"] = data


        }


     

        let newDetails = new userDetail(obj);

        let saveDoc = await newDetails.save();

        if (saveDoc) {
            return response.status(200).json({
                success: true,
                message: "successfully uploaded",
                data: saveDoc
            })
        }
        else {
            return response.status(500).json({
                success: false,
                message: "some error has occured"
            })
        }


    } catch (error) {
        console.log("error", error);
        return response.status(500).json({
            success: false,
            message: error.message
        })
    }
}




