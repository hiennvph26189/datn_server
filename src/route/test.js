import express from "express";


import homcontrollerTEST from "../controllers/TestController/homcontrollerTEST";
import userControllerTEST from "../controllers/TestController/userControllerTEST";
import danhSachControllerTEST from "../controllers/TestController/danhSachControllerTEST";
import productControllerTEST from "../controllers/TestController/productControllerTEST";

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

let test = (app)=>{
    router.get('/admin',(req, res)=>{
        return res.send('adafd')
    }) 
     router.get('/listDanhSach',danhSachControllerTEST.listDanhSach);
     router.post('/AddDanhSach',danhSachControllerTEST.addDanhSach);
    // router.get('/admin/userController',userController.handleGetUser);
    // router.get('/add-category',userController.addCategory);

    
    return app.use("/admin",router)

}
module.exports = test