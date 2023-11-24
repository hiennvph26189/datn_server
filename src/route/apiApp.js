import express from "express";

import homeAppControllerAPP from "../controllers/AppController/homeAppControllerAPP";
import accountControllerAPP from "../controllers/AppController/accountControllerAPP";
import productsControllerAPP from "../controllers/AppController/productsControllerAPP";
import productControllerTEST from "../controllers/productController";
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
    router.get('/list-product',productControllerTEST.handleGetProduct)
    router.get('/post-product',productControllerTEST.handleGetProduct)
    router.get('/put-product',productControllerTEST.handleGetProduct)
    router.get('/delete-product',productControllerTEST.handleGetProduct)

    router.post('/post-category',homeAppControllerAPP.handlePostCategory)
    router.put('/put-category',homeAppControllerAPP.handlePutCategory)
    router.delete('/delete-category',homeAppControllerAPP.handleDeleteCategory)
    // list category
    router.get('/app-list-category',homeAppControllerAPP.handleGetCategories)
    //list get host order products app
    router.get('/api-app/list-hot-order-product',productsControllerAPP.handleGetHotOrdersProduct)
    // list hot sale products app
    router.get('/api-app/list-hot-sale-product',productsControllerAPP.handleGetHotSaleProduct)
    // list sản phẩm mới nhất
    router.get('/api-app/list-new-product',homeAppControllerAPP.handleGetNewProduct)
    // list sản phẩm theo categories
    router.get('/api-app/list-category-in-products',productsControllerAPP.getCategoryInProducts)
    // Login member app
    router.post('/api/login-member',accountControllerAPP.handleLoginMember);
    // api đăng kí tài khoản
    router.post('/api/add-member',accountControllerAPP.handleAddMembers);
    return app.use("/",router)
}
module.exports = apiApp