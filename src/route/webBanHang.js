import express from "express";
var appRoot = require('app-root-path');
import trangChuController from "../controllers/WebBanHangController/trangChuController";
import menuController from "../controllers/WebBanHangController/menuController";
import newsController from "../controllers/WebBanHangController/newsController";

import productController from "../controllers/WebBanHangController/productController";
let router = express.Router();


let webBanHang = (app)=>{
    router.get('/',trangChuController.getTrangChu) 
    router.get('/TrangChu',trangChuController.getTrangChu);
    router.get('/getCategory-menu',menuController.getCategoryMenu);
    router.get('/getCategory-products',menuController.getCategoryProducts);
    router.get('/danhMucSanPham-menu',menuController.getDanhMucSanPham);
    router.get('/sanPhamBanChay-products',productController.getSanPhamBanChayProducts);
    router.get('/getTinTuc-News',newsController.getTinTucNew);
    
    // router.get('/add-category',userController.addCategory);

    
    return app.use("/",router)
}
module.exports = webBanHang