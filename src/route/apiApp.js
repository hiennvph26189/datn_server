import express from "express";

import homeAppController from "../controllers/appController/homeAppController";
import productController from "../controllers/productController";
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
    router.get('/list-product',productController.handleGetProduct)
    router.get('/post-product',productController.handleGetProduct)
    router.get('/put-product',productController.handleGetProduct)
    router.get('/delete-product',productController.handleGetProduct)
    router.post('/post-category',homeAppController.handlePostCategory)
    router.put('/put-category',homeAppController.handlePutCategory)
    router.delete('/delete-category',homeAppController.handleDeleteCategory)
    // list category
    router.get('/app-list-category',homeAppController.handleGetCategories)
    //list homeApp
    router.get('/app-list-hot-order-product',homeAppController.handleGetHotProduct)
    router.get('/app-list-sale-order-product',homeAppController.handleGetSaleProduct)
    router.get('/app-list-new-order-product',homeAppController.handleGetNewProduct)
    // list product by category
    router.get('/app-list-product-by-category',homeAppController.handleGetProductByCategory)
    return app.use("/",router)
}
module.exports = apiApp