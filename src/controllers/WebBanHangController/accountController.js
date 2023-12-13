import accountService from "../../services/webbanhangService/accountService";
import setToken from "./convertToken.js"
const jwt = require('jsonwebtoken');
require('dotenv').config();
const cookie = require('cookie');

let getLogin = async (req, res) => {
  
    try {
        
        
        return res.render("webBanHang/login_register/form-login.ejs")
     } catch (error) {
         console.log("Lỗi phân quyền",error)
        return res.status(200).json({
             errCode: -1,
             errMessage: 'Không kết nối được với sever'
        })
     }
   
};
let getRegister = async (req, res) => {
  
    try {
        
        
        return res.render("webBanHang/login_register/form-register.ejs")
     } catch (error) {
         console.log("Lỗi phân quyền",error)
        return res.status(200).json({
             errCode: -1,
             errMessage: 'Không kết nối được với sever'
        })
     }
   
};
let postRegister = async (req, res) => {
  
    try {
        let data = req.body
        let postRegister = await accountService.postRegisterService(data);
        if(postRegister.errCode == 0){
            return res.send(postRegister)
        }
       
     } catch (error) {
         console.log("Lỗi phân quyền",error)
        return res.status(200).json({
             errCode: -1,
             errMessage: 'Không kết nối được với sever'
        })
     }
   
};
let postLoginMenber = async (req, res) => {
  
    try {
        var cookie = req.cookies.dataMember;

        
            let data = req.body
            // let  cookie = req.cookies.cookieName;
            
            let postLogin = await accountService.postLoginMemmberService(data);
        
            let dataUser =postLogin.user
              
    
            if(postLogin.errCode == 0){
                return res.send(postLogin)
                
            }else{
                await setToken.setToken(req, res, dataUser)
                return res.send(postLogin)
            }
       
       
     } catch (error) {
         console.log("Lỗi phân quyền",error)
        return res.status(200).json({
             errCode: -1,
             errMessage: 'Không kết nối được với sever'
        })
     }
   
};
let getNameUser = async (req, res) => {
    
  
    try {
      var cookie = req.cookies.accessToken;
      const secretKey = process.env.MY_SECRET_KEY 
        let user_id = jwt.verify(cookie, secretKey, (err, user) => {
            if (err) {
                return res.status(403).json({ message: 'Token verification failed' });
            }
            req.user = user;
            return user.id
            
            });
           
      if(user_id){
            let infoUser =  await accountService.getOneUserInfoService(user_id)
        
        return res.send(infoUser)
      }else{
        return res.send("Bạn chưa đăng nhập")
      }
      
     
     } catch (error) {
         console.log("Lỗi phân quyền",error)
        return res.status(200).json({
             errCode: -1,
             errMessage: 'Không kết nối được với sever'
        })
     }
   
  };
  let getLogOut = async (req, res) => {
    
  
    try {
        await setToken.setTokenLogOut(req, res)
        
      
     
     } catch (error) {
         console.log("Lỗi phân quyền",error)
        return res.status(200).json({
             errCode: -1,
             errMessage: 'Không kết nối được với sever'
        })
     }
   
  }; 

let getProfileMember = async (req, res) => {
    
  
    try {
        var cookie = req.cookies.accessToken;
        const secretKey = process.env.MY_SECRET_KEY 
        let user_id = jwt.verify(cookie, secretKey, (err, user) => {
            if (err) {
                return res.status(403).json({ message: 'Token verification failed' });
            }
            req.user = user;
            return user.id
            
            });
        let infoUser =  await accountService.getOneUserInfoService(user_id)
        let price_member = infoUser.selectUser.tienTk.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })
        let list_order =  await accountService.getCountOrder(user_id)
        
        return res.render('webBanHang/profileMember.ejs',{infoUser:infoUser.selectUser,price:price_member,totalOrder:list_order.getCountOrder})
     } catch (error) {
         console.log("Lỗi phân quyền",error)
        return res.status(200).json({
             errCode: -1,
             errMessage: 'Không kết nối được với sever'
        })
     }
   
  };
let getDanhMucProfile = async (req, res) => {
    
  
    try {
        
        return res.render('webBanHang/listDanhMucProfileMember.ejs')
     } catch (error) {
         console.log("Lỗi phân quyền",error)
        return res.status(200).json({
             errCode: -1,
             errMessage: 'Không kết nối được với sever'
        })
     }
   
  };
module.exports = {
    getLogin:getLogin,
    getRegister:getRegister,
    postRegister:postRegister,
    postLoginMenber:postLoginMenber,
    getNameUser:getNameUser,
    getLogOut:getLogOut,
    getProfileMember:getProfileMember,
    getDanhMucProfile:getDanhMucProfile
}