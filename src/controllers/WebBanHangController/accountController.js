import accountService from "../../services/webbanhangService/accountService";
import accountServiceAPP from "../../services/appServices/accountServiceAPP";
import memberServiceAPP from "../../services/appServices/memberServiceAPP";
import setToken from "./convertToken.js"
const jwt = require('jsonwebtoken');
import axios from "axios"
require('dotenv').config();
const cookie = require('cookie');
const moment = require('moment-timezone');
let formatDate = (date)=>{
    const timeZone = 'Asia/Ho_Chi_Minh';
    console.log(date);
    const formattedDate = moment(date).tz(timeZone).format('DD/MM/YYYY HH:mm:ss')
    return formattedDate
  } 
let checkIdUser = (req,res,cookie)=>{
   
    const secretKey = process.env.MY_SECRET_KEY 
    let id = 0
    jwt.verify(cookie, secretKey, (err, user) => {
        if (err) {
            console.log('Token verification failed');
          
        }
        req.user = user;
      
        id =  user.id
        
        });
        return id
}
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
let handleNapTien = async (req, res) => {
    
  
    try {
        
        return res.render('webBanHang/postNapTien9pay.ejs')
     } catch (error) {
         console.log("Lỗi phân quyền",error)
        return res.status(200).json({
             errCode: -1,
             errMessage: 'Không kết nối được với sever'
        })
     }
   
  };
  let lichSuNapTien = async (req, res) => {
    
  
    try {
        var cookie = req.cookies.accessToken;
        let id_member = checkIdUser(req,res,cookie)
        let message = await  memberServiceAPP.lichSuNapTienMembersService(id_member)
        let newData = []
        if(message.errCode == 0){
            let data =  message.data
            data.map((item) =>{
                newData.push({
                    ...item,
                    tienNap: item.tienNap.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }),
                    createdAt: formatDate(item.createdAt)

                })
            })
        }
        return res.render('webBanHang/lichSuNapTien.ejs',{
            arrNapTien : newData
        })
     } catch (error) {
         console.log("Lỗi phân quyền",error)
        return res.status(200).json({
             errCode: -1,
             errMessage: 'Không kết nối được với sever'
        })
     }
   
  };
let postNapTien9Pay = async (req, res) => {
    
  
    try {
        var cookie = req.cookies.accessToken;
        let id_member = checkIdUser(req,res,cookie)
        let price = req.body.price
        if(price <20000){
            return res.send({
                errCode: 1,
                errMessage: 'Tiền nạp ít nhất là 20000 VNĐ'
           })
        }
        let formdata = new FormData();
    formdata.append("name", "Nạp tiền tài khoản")
    formdata.append("price", `${price}`)
    formdata.append("cookie_port", "naptienweb")
    formdata.append("token", `${cookie}`)


    axios({
        url: "https://shopacc12312.000webhostapp.com/thongtinkhachhang.php",
        method: 'POST',
        data: formdata,
        headers: {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
            'Authorization': 'Basic YnJva2VyOmJyb2tlcl8xMjM='
        }
    })
        .then(function (response) {
            
            let url = response.data.redirectUrl
            return res.send({
                errCode:0,
                errMessage:"sfafd",
                url:url
            })
        })
        .catch(function (error) {
            console.log("error from image :", error);
        })
       
     } catch (error) {
         console.log("Lỗi phân quyền",error)
        return res.status(200).json({
             errCode: -1,
             errMessage: 'Không kết nối được với sever'
        })
     }
   
  };
  let checkNapTien9Pay = async (req, res) => {
    
  
    try {
        
        var cookie = req.query.token;
        const buff = Buffer.from(req.query.result, 'base64');
        let cart_id = req.query.id_cart
        // decode buffer as UTF-8
        const str = buff.toString('utf-8');
        let data = JSON.parse(str)
        
        // let id_member = checkIdUser(req,res,cookie)
       
        let id_member = checkIdUser(req,res,cookie)  
       
        if(data.status == 5){
            let data2 = {
                data9Pay: data,
                id:id_member
            }
            let message = await accountServiceAPP.handleNapTienMenbersService(data2);
                if(message.errCode == 0){
                    return res.redirect('/thanh-toan-thanh-cong')
                }else{
                    return res.redirect("/thanh-toan-that-bai");
                }
                
                
           
         
        }else{
            return res.redirect("/thanh-toan-that-bai");
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
    getNameUser:getNameUser,
    getLogOut:getLogOut,
    getProfileMember:getProfileMember,
    getDanhMucProfile:getDanhMucProfile,
    handleNapTien:handleNapTien,
    postNapTien9Pay:postNapTien9Pay,
    checkNapTien9Pay:checkNapTien9Pay,
    lichSuNapTien:lichSuNapTien
}