import express from "express";
var appRoot = require('app-root-path');
import trangChuController from "../controllers/WebBanHangController/trangChuController";
import menuController from "../controllers/WebBanHangController/menuController";
import newsController from "../controllers/WebBanHangController/newsController";
import sanPhamChiTiet from "../controllers/WebBanHangController/sanPhamChiTiet";
import lienHeController from "../controllers/WebBanHangController/lienHecontroller";
import gioiThieuController from "../controllers/WebBanHangController/gioiThieuController";
import accountController from "../controllers/WebBanHangController/accountController";
import myMiddleware  from "../controllers/WebBanHangController/myMiddleware";


import productController from "../controllers/WebBanHangController/productController";
let router = express.Router();


let webBanHang = (app)=>{
    router.get('/',trangChuController.getTrangChu) 
    router.get('/TrangChu',trangChuController.getTrangChu);
   
    router.get('/products-detal-item',trangChuController.getProductsDetailItem);
    router.get('/getCategory-menu',menuController.getCategoryMenu);
    router.get('/sapXep-products',menuController.sapXepProduct);

    // Sản phẩm chi tiết
    router.get('/san-pham-chi-tiet',sanPhamChiTiet.getSanPhamChiTiet);
    
    router.get('/getCategory-products',menuController.getCategoryProducts);
    router.get('/danhMucSanPham-menu',menuController.getDanhMucSanPham);
    router.get('/sanPhamBanChay-products',productController.getSanPhamBanChayProducts);
    router.get('/getTinTuc-News',newsController.getTinTucNew);
    
    // router.get('/add-category',userController.addCategory);
    // Trang Liên hệ
    router.get('/lien-he',lienHeController.getLienHe);
    router.post('/post-lien-he',lienHeController.postLienHe);
    router.get('/form-lien-he',lienHeController.formLienHe);

    // Trang giới thiệu
    router.get('/gioi-thieu',gioiThieuController.getGioiThieu);

    // Trang tin tức
    router.get('/tin-tuc',newsController.getAllTinTuc);
    router.get('/news-detail',newsController.getTinTucDetail);
    // search sản phẩm
    router.get('/search-products',menuController.searchItems);
    router.get('/tim-kiem',menuController.searchSubmit);
    // đăng nhập - đăng kí - đăng xuất
    router.get('/get-login',accountController.getLogin);
    router.get('/get-register',accountController.getRegister);
    // đăng kí tài khoản
    router.post('/post-register',accountController.postRegister);
    // đăng nhập tài khoản
    router.post('/post-login',accountController.postLoginMenber);
    // list tên Ng dùng
    router.get('/getName',myMiddleware.checkLoginAPI,accountController.getNameUser);
   
    return app.use("/",router)
}
module.exports = webBanHang