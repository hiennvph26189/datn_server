import express from "express";

import homeAppControllerAPP from "../controllers/AppController/homeAppControllerAPP";
import accountControllerAPP from "../controllers/AppController/accountControllerAPP";
import productsControllerAPP from "../controllers/AppController/productsControllerAPP";
import memberControllerAPP from "../controllers/AppController/memberControllerAPP";
import lienHeControllerAPP from "../controllers/AppController/lienHeControllerApp";
import starControllerAPP from "../controllers/AppController/starControllerAPP";
import thanhToanController from "../controllers/AppController/thanhToanController";
import testSocketControllerAPP from "../controllers/AppController/testSocketControllerAPP";

import newsControllerAPP from "../controllers/AppController/newsControllerAPP";
import orderControllerAPP from "../controllers/AppController/orderControllerAPP";
import categoryController from "../controllers/AppController/categoriesControllerAPP";

import likeProductControllerAPP from "../controllers/AppController/likeProductControllerAPP";
import addressControllerAPP from "../controllers/AppController/addressControllerAPP";

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
    // Sửa Profile
    router.put('/api/edit-profile-member',memberControllerAPP.handleEditProfileMember);
    // post order Products 9pay
    router.post('/api-app/post-order-product-9pay-card',orderControllerAPP.handleOrderCard9Pay);

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
   // api sản phẩm yêu thích
    router.post('/api-app/like-products',likeProductControllerAPP.handlePostLikeProduct);
    // api xóa sản phẩm yêu thích
    router.delete('/api-app/delete-like-products',likeProductControllerAPP.handleDeleteLikeProduct);
    // api thêm địa chỉ members
    router.post('/api-app/address-member',addressControllerAPP.handlePostAddressMembers);
    // api xóa địa chỉ members
    router.put('/api-app/delete-address-member',addressControllerAPP.handleDeleteAddressMembers);
    // api sửa địa chỉ members
    router.put('/api-app/put-address-member',addressControllerAPP.handlePutAddressMembers);
    // api sửa trạng thái địa chỉ members
    router.put('/api-app/edit-status-address-member',addressControllerAPP.handleEditStatusAddressMembers);
    //
    router.get('/api-app/convert-sha',orderControllerAPP.getConvertSha);
    // test socket
    router.post('/api-app/add-cart-products-size',orderControllerAPP.handleAddCardProductSizeAPP);
    // list size > 0 theo products
    router.get('/api-app/list-products-size',productsControllerAPP.listSizesInProduct);
    // list cart product sizes 
    router.get('/api-app/list-cart-products-size',productsControllerAPP.listSizesInCartNnProduct);

    // api get tỉnh thành
    router.get('/api-app/tinhThanh',addressControllerAPP.handleGetTinhThanh);
    // api get Quận
    router.get('/api-app/quan',addressControllerAPP.handleGetQuan);
    // api get Xã
    router.get('/api-app/xa',addressControllerAPP.handleGetXa);

    // check số lượng sản phẩm tỏng khi order
    router.post('/api-app/Check-soluong-sanpham-theo-size',orderControllerAPP.handleCheckSoLuongTheoSize);

    // api get Xã
    router.get('/api-app/get-address-member',addressControllerAPP.handleGetAddress);
    // reset cart 
    router.post('/api-app/post-reset-cart',orderControllerAPP.handleResetCart);
    // get prodicts cart vote star
    router.get('/api-app/get-product-cart-vote-star',productsControllerAPP.getProductCartVoteStar);
    // post vote start 
    router.post('/api-app/post-vote-star-product',starControllerAPP.postVoteStarProduct);
    // check vote star products
    router.get('/api-app/check-vote-star',starControllerAPP.checkVoteStarProduct);
    // total number star products
    router.get('/api-app/get-total-star-product',starControllerAPP.getTotalStarProduct);
    // get card product in id_user
    router.get('/api-app/get-cart-product-in-idmember',productsControllerAPP.getProductCartUser);
    // get item address member
    router.get('/api-app/get-item-address-in-idmember',addressControllerAPP.getItemAddressInIdMember);
    // get address order detail
    router.get('/api-app/get-item-address-order-detail',addressControllerAPP.getItemAddressOrderDetail);
    // get phuong thức thanh toán theo order
    router.get('/api-app/get-method-thanh-toan',thanhToanController.getMethodPayOrder);
    return app.use("/",router)
}
module.exports = apiApp