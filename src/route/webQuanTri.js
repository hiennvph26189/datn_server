import express from "express";
import multer from 'multer';
import path from 'path';
import homcontroller from "../controllers/WebQuanTriController/homcontrollerADMIN";
import userController from "../controllers/WebQuanTriController/userControllerADMIN";
import categoryController from "../controllers/WebQuanTriController/categoryControllerADMIN";
import productController from "../controllers/WebQuanTriController/productControllerADMIN";
import odersController from "../controllers/WebQuanTriController/odersControllerADMIN";
import memberController from "../controllers/WebQuanTriController/memberControllerADMIN";
import newsController from "../controllers/WebQuanTriController/newsControllerADMIN";
import sizeControllerADMIN from "../controllers/WebQuanTriController/sizeControllerADMIN";

import appRoot from "app-root-path"
import  uploadCloud from '../config/uploadFile'
let router = express.Router();


let webQuanTri = (app)=>{
   

    // API trên web quản trị
    router.get('/homeCOntroller',homcontroller.getHomePage)
    router.get('/crud',homcontroller.getCRUD);
    router.post('/post-crud',homcontroller.postCRUD);
    router.get('/get-crud',homcontroller.getListCRUD);
    router.get('/edit-crud',homcontroller.getEditCRUD);
    router.post('/post-edit-crud',homcontroller.getPutEditCRUD);
    router.get('/delete-crud',homcontroller.getDeleteCRUD);


    router.post('/api/login',userController.handleLogin);
    router.get('/api/get-all-users',userController.handleGetAllUsers);
    router.post('/api/creat-new-users',userController.handleCreateNewUsers);
    router.put('/api/edit-users',userController.handleEditUsers);
    router.delete('/api/delete-users',userController.handleDeleteUsers);
    router.get('/roles',userController.handleRoleID);

    router.get('/api/get-all-categories',categoryController.handleGetAllcategories);
    router.post('/api/add-categories',categoryController.handleAddCategories);
    router.put('/api/edit-categories',categoryController.handleEditCategories);
    router.delete('/api/delete-categories',categoryController.handleDeleteCategory);

    // api News
    router.get('/api/get-all-news',newsController.handleGetAllNews);
    router.post('/api/add-news',newsController.handleAddNews);
    router.put('/api/edit-news',newsController.handleEditNews);
    router.delete('/api/delete-news',newsController.handleDeleteNews);



    // api products
    router.get('/api/get-all-product',productController.handleGetAllProducts);
    router.get('/api/get-one-product',productController.handleGetOneProducts);
    router.get('/api/get-all-total-product',productController.handleGetAllTotalProducts);
    router.post('/api/add-product',productController.handleAddProducts);
    router.delete('/api/delete-product',productController.handleDeleteProduct);
    router.put('/api/edit-product',productController.handleEditProduct);
    router.post('/api/get-product',productController.handleGetProduct);
    router.post('/api/post-image-product',uploadCloud.single('image'),productController.handleUploadFileProduct);
    router.post('/api/delete-image-product',productController.handleDeleteFileProduct);
    router.get('/api/get-all-catygory-product',productController.handleGetAllCategoryProduct);
    
  

    router.get('/api/user-carts-product',odersController.handleGetUserCartProducts);
   
    router.post('/api/oders-product',odersController.handleOdersProducts);
    router.delete('/api/delete-cart-product',odersController.handleDeleteCartProducts);
    router.put('/api/update-cart-product',odersController.handleUpdateCartProducts);
    router.post('/api/orders-cart-product',odersController.handleOrserCartProducts);
    router.get('/api/lich-su-cart-product',odersController.handleLichSuCartProducts);
    router.put('/api/huy-don-cart-product',odersController.handleHuyDonCartProducts);
    router.get('/api/chi-tiet-don-cart-product',odersController.handleChiTietDonProducts);
    router.get('/api/get-all-orders-product',odersController.handleGetAllOrdersProducts);
    router.put('/api/huy-orders-success-product',odersController.handleHuyDonThanhCongProducts);
    router.delete('/api/delete-orders',odersController.handleDeleteOrder);
    router.put('/api/check-orders',odersController.handleCheckOrder);
    router.put('/api/giao-don-orders',odersController.handleGiaoDonOrder);
    router.get('/api/thong-ke-orders',odersController.handleThongKeOrders);




    // API Members webADmin
    router.get('/api/get-all-members',memberController.handleGetAllMenbers);
    router.put('/api/edit-members',memberController.handleEditMenbers);
    router.delete('/api/delete-members',memberController.handleDeleteMenbers);
    router.post('/api/naptien-members',memberController.handleNapTienMenbers);
    router.get('/api/lich-su-naptien-members',memberController.handleLichSuNapMenbers);
    router.get('/api/lich-su-naptien-members-admin',memberController.handleLichSuNapMenbersAdmin);
    router.put('/api/naptien-members-admin',memberController.handleNapTienMenbersADmin);
    router.put('/api/huynaptien-members-admin',memberController.handleHuyNapTienMenbersADmin);
    router.delete('/api/delete-nap-tien-Member',memberController.handleDeleteNapTienMenber);
  

    // API trên app điện thoại
 
    router.get('/get/one-member',memberController.handleGetOneMembers);
   
    router.post('/api/profile-member',memberController.handleProfileMember);
    router.put('/api/edit-profile-member',memberController.handleEditProfileMember);
    router.get('/api/get-all-product-category',productController.handleGetAllProductsCategories);

    // get Sise admin WebQuanTri
    router.get('/api-admin/getSize',sizeControllerADMIN.getSizeADMIN);
    
    
    return app.use("/",router)
}
module.exports = webQuanTri