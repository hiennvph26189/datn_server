import express from "express";

import homcontroller from "../controllers/homcontroller";
import userController from "../controllers/userController";

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

let initWebRouter = (app)=>{
    router.get('/',(req, res)=>{
        return res.send('adafd')
    }) 
    router.get('/admin/userController',userController.handleGetUser)
//     router.get('/get-all-sp',testController.getListCRUD)
//     router.post('/add-product',upload.single('profile_pic'),testController.getAddProduct)
//     router.get('/item-products',testController.getOneProduct)
//     router.post('/edit-product',upload.single('profile_pic'),testController.getEditProduct)
//     router.post('/delete-products',testController.getDeleteProduct)
    
//     router.get('/upload', homcontroller.getUploadFilePage);
// router.post('/upload-profile-pic', upload.single('profile_pic'), homcontroller.handleUploadFile)

   




    return app.use("/",router)
}
module.exports = initWebRouter