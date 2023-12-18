import express from "express";
var appRoot = require('app-root-path');
import trangChuController from "../controllers/WebBanHangController/trangChuController";
import menuController from "../controllers/WebBanHangController/menuController";
import newsController from "../controllers/WebBanHangController/newsController";
import addressMember from "../controllers/WebBanHangController/addressMember";
import sanPhamChiTiet from "../controllers/WebBanHangController/sanPhamChiTiet";
import lienHeController from "../controllers/WebBanHangController/lienHecontroller";
import gioiThieuController from "../controllers/WebBanHangController/gioiThieuController";
import accountController from "../controllers/WebBanHangController/accountController";
import myMiddleware  from "../controllers/WebBanHangController/myMiddleware";
import PayController  from "../controllers/WebBanHangController/9PayController";
import orderController  from "../controllers/WebBanHangController/orderController";


import productController from "../controllers/WebBanHangController/productController";
let router = express.Router();


let webBanHang = (app)=>{
    router.get('/',trangChuController.getTrangChu) 
    // router.get('/TrangChu',trangChuController.getTrangChu);
   
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
    // test 9pay
    router.get('/get-9pay',PayController.get9Pay);
    router.get('/get-9pay-return',PayController.get9PayReturn);
    router.post('/post-9pay',PayController.post9Pay);
    router.post('/api/post-9pay',PayController.postAPI9Pay);
    router.get('/api/get-9pay',PayController.getAPI9Pay);
    // đăng xuất tài khoản
    router.get('/get-log-out',myMiddleware.checkLogin,accountController.getLogOut);
    // /profile-member
    router.get('/profile-member',myMiddleware.checkLogin,accountController.getProfileMember);
    router.get('/danhmuc-profile-member',myMiddleware.checkLogin,accountController.getDanhMucProfile);
    router.get('/dia-chi-member',myMiddleware.checkLogin,addressMember.getDiaChimember);
    router.post('/add-cart',myMiddleware.checkLogin,orderController.handleAddCartWeb);
    router.get('/don-hang',myMiddleware.checkLogin,orderController.litsDonHangCart);
    router.get('/ajax-list-don-hang',myMiddleware.checkLogin,orderController.ajaxListDonHangCart);
    router.get('/cong-soluong-cart',myMiddleware.checkLogin,orderController.congSoLuongCart);
    router.get('/tru-soluong-cart',myMiddleware.checkLogin,orderController.truSoLuongCart);
    router.delete('/delete-cart',myMiddleware.checkLogin,orderController.deleteCart);
    router.get('/item-list-addess',myMiddleware.checkLogin,addressMember.handleItemListAddess);
    router.post('/add-address-member',myMiddleware.checkLogin,addressMember.addDiaChiMemmber);
    router.delete('/delete-address-member',myMiddleware.checkLogin,addressMember.delateAddressMember);
    router.get('/set-status-address',myMiddleware.checkLogin,addressMember.setStatusAddress);
    router.get('/update-size-order',myMiddleware.checkLogin,orderController.updateSizeOrder);
    router.get('/list-order-thanhtoan',myMiddleware.checkLogin,orderController.listOrderThanhToan);
    router.get('/list-one-address-member',myMiddleware.checkLogin,addressMember.listOneAddressMember);
    router.post('/post-thanh-toan',myMiddleware.checkLogin,orderController.postThanhToanWeb);
    router.get('/get-check-thanh-toan-9Pay',orderController.checkThanhToan9Pay);
    router.get('/thanh-toan-that-bai',orderController.thanhToanThatBai);
    router.get('/thanh-toan-thanh-cong',orderController.thanhToanThanhCong);
    router.get('/lich-su-mua-hang',orderController.lichSuMuaHang);
    router.get('/item-don-dang-xu-ly',orderController.itemDonDangXuLy);
    router.get('/item-child-LSDH',orderController.itemDetailChildLSDH);
    router.get('/item-don-dang-giao',myMiddleware.checkLogin,orderController.itemDonDangGiao);
    router.get('/item-don-giao-thanh-cong',myMiddleware.checkLogin,orderController.itemDonGiaoThanhCong);
    router.get('/item-don-huy',myMiddleware.checkLogin,orderController.itemDonHuy);
    router.get('/item-don-hoan',myMiddleware.checkLogin,orderController.itemDonHoan);
    router.get('/nap-tien',myMiddleware.checkLogin,accountController.handleNapTien);
    router.post('/post-naptien-9pay',myMiddleware.checkLogin,accountController.postNapTien9Pay);
    router.get('/check-thanh-toan-nap-tien',accountController.checkNapTien9Pay);
    router.get('/lich-su-nap-tien',myMiddleware.checkLogin,accountController.lichSuNapTien);
    router.get('/check-vote-star-web',myMiddleware.checkLogin,orderController.checkVoteStarWeb);
    router.get('/count-cart',orderController.countCart);
    

    
    return app.use("/",router)
}
module.exports = webBanHang