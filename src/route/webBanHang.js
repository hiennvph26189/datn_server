import express from "express";
var appRoot = require('app-root-path');
import trangChuController from "../controllers/WebBanHangController/trangChuController";
import menuController from "../controllers/WebBanHangController/menuController";
let router = express.Router();


let webBanHang = (app)=>{
    router.get('/',(req, res)=>{
        return res.render("WebBanHang/TrangChu.ejs")
    }) 
    router.get('/TrangChu',trangChuController.getTrangChu);
    router.get('/getCategory-menu',menuController.getCategoryMenu);
    router.get('/getCategory-products',menuController.getCategoryProducts);
    // router.get('/add-category',userController.addCategory);

    
    return app.use("/",router)
}
module.exports = webBanHang