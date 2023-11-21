import accountService from "../../services/webbanhangService/accountService";
import setToken from "./convertToken.js"
const jwt = require('jsonwebtoken');
require('dotenv').config();
const cookies = require('cookie');
require('dotenv').config();

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
                // const secretKey = process.env.MY_SECRET_KEY
                // const token = jwt.sign(dataUser, secretKey, { expiresIn: '1d' });
                // res.setHeader('Set-Cookie', cookies.serialize('accessToken', token, {
                //   httpOnly: true,
                //   maxAge: 1 * 24 * 60 * 60, // 30 days in seconds
                //   sameSite: 'strict',
                //   path: '/'
                // }));
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
module.exports = {
    getLogin:getLogin,
    getRegister:getRegister,
    postRegister:postRegister,
    postLoginMenber:postLoginMenber,
    getNameUser:getNameUser
}