import express from "express";

import homeAppController from "../controllers/appController/homeAppController";

import multer from 'multer';
import path from 'path';
var appRoot = require('app-root-path');



const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, appRoot + "/src/public/upload/");
    },

    // By default, multer removes file extensions so let's add them back
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const imageFilter = function (req, file, cb) {
    // Accept images only
    if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
        req.fileValidationError = 'Only image files are allowed!';
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
};

let upload = multer({ storage: storage, fileFilter: imageFilter,limits:{fileSize:1*1024*1024}});
let router = express.Router();

// get , post , delete, push
let apiApp = (app)=>{
    router.get('/app-api',homeAppController.handleGetProduct)
    router.post('/post-category',homeAppController.handlePostCategory)
    router.put('/put-category',homeAppController.handlePutCategory)
    router.delete('/delete-category',homeAppController.handleDeleteCategory)
    return app.use("/",router)
}
module.exports = apiApp