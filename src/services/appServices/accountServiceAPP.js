const { QueryTypes } = require('sequelize');
// import sequelize from "../../src/config/queryDatabase"
import sequelize from "../../config/queryDatabse"
import bcrypt from 'bcryptjs';
import db from "../../models/index";
import getdateService from "../webbanhangService/getdateService";
import {getOneEmail} from "../webbanhangService/accountService"
let salt = bcrypt.genSaltSync(10);
let checkUserEmail = (email)=>{
    return new Promise(async (resolve, reject)=>{
        try {
            let user = await db.Members.findOne({
                where: {email: email}
            })
            if (user) {
                resolve(true)
            }else{
                resolve(false)
            }
        } catch (error) {
            reject(error);
        }
    })
}
let hashUserPassword = (password)=>{
    return new Promise(async(resolve, reject)=>{
       try {
        let hashPassword =  bcrypt.hashSync(password.toString(), salt);
        
        resolve(hashPassword);

       } catch (error) {
            reject(error);
       }
        
        
    })
}
let handleUserMembersLoginService = (email, password)=>{

    return new Promise(async (resolve, reject)=>{
        try {
            let userData = {};
            let isExit = await checkUserEmail(email)
            if(isExit){
                let user = await db.Members.findOne({ 
                    
                    where: {email: email},
                   
                    
                })
                if(user){
                   
                  let checkPassword =  bcrypt.compareSync(password,user.matKhau)
                 
                  console.log(user.matKhau)
                  if(checkPassword){
                    userData.errCode = 0;
                    userData.errMessage = "Đăng nhập thành công";
                    delete user.matKhau;
                    userData.user = user 
                  }else{
                    userData.errCode = 3;
                    userData.errMessage = "Mật khẩu không chính xác"
                  }
                }else{
                    userData.errCode = 2;
                    userData.errMessage = "Email không tồn tại, hãy thử lại 1 email khác";
                }
               
                
            }else{
                userData.errCode = 4;
                userData.errMessage = "Email không tồn tại, hãy thử lại 1 email khác";

               
            }
            resolve(userData)
        } catch (error) {
            reject(error);
        }
    })
}
let AddMembersService = (data)=>{
    return new Promise(async(resolve, reject)=>{
        try {
            let check = await checkUserEmail(data.email)
            if(check === true) {
                resolve({
                    errCode: 1,
                    errMessage: "Email đã tồn tại, vui lòng chọn email khác",
                    data:{}
                    
                })
            }else{
            
            let hashPasswordFromBcrypt =  await hashUserPassword(data.matKhau);
                console.log(data.matKhau,'lakdfladf')
                console.log(hashPasswordFromBcrypt)
                await db.Members.create({
                    email: data.email,
                    tenThanhVien: data.tenThanhVien,
                    anhDaiDien: data.anhDaiDien,
                    anhCK: data.anhCK,
                    soDienThoai: data.soDienThoai,
                    diaChi: data.diaChi,
                    gioiTinh: data.gioiTinh,
                    matKhau: hashPasswordFromBcrypt,
                    tienTk:0,
                    status:0
                })
              
                resolve({
                    errCode: 0,
                    errMessage: "Ok", 
                })
            
            }
           
        } catch (error) {
            reject(error)
        }
         
     }) 
}
let handleUserMembersChangePassService = (data)=>{

    return new Promise(async (resolve, reject)=>{
        try {
            
            let id = data.id
            let password = data.password
            let passwordNew = data.passwordNew
            let re_password = data.re_password
            const getOneMember = await sequelize.query(`
            SELECT *
            FROM members
            where id=${id}
            `, { type: QueryTypes.SELECT });
          
            if(getOneMember.length>0){
                let checkPassword =  bcrypt.compareSync(password,getOneMember[0].matKhau)
              console.log(checkPassword);
                if(checkPassword){
                    // resolve({
                    //     errCode:1,
                    //     errMessage: 'Đăng nhập thành công',
                     
                    // }) 
                    if (passwordNew == re_password) {
                        let hashPassword = await hashUserPassword(passwordNew)
                        let date = getdateService.getdate();
                        await sequelize.query(`
                        UPDATE members
                        SET matkhau = "${hashPassword}",
                        updatedAt = "${date}"
                        WHERE  id=${id};
                        `, { type: QueryTypes.UPDATE });
                        resolve({
                        errCode:1,
                        errMessage: 'Đổi mật khẩu thành công',
                     
                    }) 
                    }else{
                        resolve({
                            errCode:0,
                            errMessage: 'mật khẩu không trùng khớp',
                         
                        }) 
                    }
                }else{
                    resolve({
                        errCode:0,
                        errMessage: 'Mật khẩu không chính xác',
                        
                    }) 
                }
                
            }else{
                resolve({
                    errCode:0,
                    errMessage: 'Email không tồn tại',
                    
                }) 
            }
           
            } catch (error) {
                reject(error);
        }
    })
}
module.exports  = {
    
    handleUserMembersLoginService:handleUserMembersLoginService,
    AddMembersService:AddMembersService,
    handleUserMembersChangePassService:handleUserMembersChangePassService
}