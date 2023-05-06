const express = require("express");
const router = express.Router();
const {uploadDetails,demo} = require("../controller/user");
const {schemas,middlewareValidation} = require(".././middleware/validate");
const multer = require("multer");
const path = require("path")

const fileStorage = multer.diskStorage({
    destination: "public/document",
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '_' + Date.now()) +
            path.extname(file.originalname)
    }
})

const upload = multer({
    storage: fileStorage
})





router.post("/upload-details",upload.any(),middlewareValidation(schemas.userDetails),uploadDetails);




module.exports = router;