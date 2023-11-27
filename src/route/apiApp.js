import express from "express";

import homeAppControllerAPP from "../controllers/AppController/homeAppControllerAPP";
import accountControllerAPP from "../controllers/AppController/accountControllerAPP";
import productsControllerAPP from "../controllers/AppController/productsControllerAPP";
import memberControllerAPP from "../controllers/AppController/memberControllerAPP";
import lienHeControllerAPP from "../controllers/AppController/lienHeControllerApp";
import newsControllerAPP from "../controllers/AppController/newsControllerAPP";
import orderControllerAPP from "../controllers/AppController/orderControllerAPP";
import categoryController from "../controllers/AppController/categoriesControllerAPP";
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
    // list all host order 
    // router.get('/api-app/list-all-hot-order-product',productsControllerAPP.handleGetALLHotOrdersProduct)
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
    //api app đổi mật khẩu
    router.put('/api-app/changepass-member',accountControllerAPP.handleChangePassMembers);

    // api app profile member
    router.post('/api/profile-member',memberControllerAPP.handleProfileMember);
    // api app liên hẹ member
    router.post('/api-app/lienhe-member',lienHeControllerAPP.handleLienHeMembers);
    // api nạp tiền
    router.post('/api/naptien-members',memberControllerAPP.handleNapTienMenbers);
    // api lịch sử nạp tiền
    router.get('/api/lich-su-naptien-members',memberControllerAPP.handleLichSuNapMenbers);
    // api app list danh mục sản phẩm
    router.get('/api/get-all-categories',categoryController.handleGetAllcategories);
    // api lít tất cả các sản phẩm trong trang chủ
    router.get('/api/get-all-total-product',productsControllerAPP.handleGetAllTotalProducts);
    // get one product
    router.get('/api/get-one-product',productsControllerAPP.handleGetOneProducts);
    // lấy ra sản phẩm trong giỏ hàng
    router.get('/api/user-carts-product',orderControllerAPP.handleGetUserCartProducts);
    // thêm order
    router.post('/api/oders-product',orderControllerAPP.handleOdersProducts);
    // delete order
    router.delete('/api/delete-cart-product',orderControllerAPP.handleDeleteCartProducts);
    // put order
    router.put('/api/update-cart-product',orderControllerAPP.handleUpdateCartProducts);
    // ---
    router.post('/api/orders-cart-product',orderControllerAPP.handleOrserCartProducts);
    // lịch sử giỏ hàng
    router.get('/api/lich-su-cart-product',orderControllerAPP.handleLichSuCartProducts);
    // hủy đơn hàng
    router.put('/api/huy-don-cart-product',orderControllerAPP.handleHuyDonCartProducts);
    // chi tiết giỏ hàng
    router.get('/api/chi-tiet-don-cart-product',orderControllerAPP.handleChiTietDonProducts);
    // delete order
    router.delete('/api/delete-orders',orderControllerAPP.handleDeleteOrder);
    // list all news
    router.get('/api/get-all-news',newsControllerAPP.handleGetAllNews);
    router.get('/get/one-member',memberControllerAPP.handleGetOneMembers);
    return app.use("/",router)
}
module.exports = apiApp