const { QueryTypes } = require('sequelize');
import sequelize from "../../config/queryDatabse"
import bcrypt from 'bcryptjs';
import datetime from "./getdateService"
import { appendFile } from "fs";
const salt = bcrypt.genSaltSync(10);
let hashUserPassword = (password)=>{
    return new Promise(async(resolve, reject)=>{
       try {
        var hashPassword = await bcrypt.hashSync(password, salt);
        resolve(hashPassword);

       } catch (error) {
            reject(error);
       }
        
        
    })
}
let getOneEmail = async(email)=>{
     return new Promise(async(resolve, reject)=>{
        try {
        let  selectEmail = await sequelize.query(`
            SELECT * FROM  members where  email = '${email}'
                `, { type: QueryTypes.SELECT });
        
                if(selectEmail.length > 0){
                    resolve({
                        errCode:1,
                        errMessage: 'Tài khoản đã tồn tại',
                        selectEmail:selectEmail[0]
                    })
                }else{
                    resolve({
                        errCode:0,
                        errMessage: 'Tài khoản chưa tồn tại',
                        selectEmail:{}
                    })
                }
            } catch (error) {
                reject(error);
        }
     }) 
    
}
let getOneUserInfoService = async(id)=>{
     return new Promise(async(resolve, reject)=>{
        try {
            console.log(id)
        let  selectUser = await sequelize.query(`
            SELECT * FROM  members where  id = ${id}
                `, { type: QueryTypes.SELECT });
        
                if(selectUser.length > 0){
                    resolve({
                        errCode:1,
                        errMessage: 'Tài khoản đã tồn tại',
                        selectUser:selectUser[0]
                    })
                }else{
                    resolve({
                        errCode:0,
                        errMessage: 'Tài khoản chưa tồn tại',
                        selectUser:{}
                    })
                }
            } catch (error) {
                reject(error);
        }
     }) 
    
}
let postLoginMemmberService = async(data)=>{
     return new Promise(async(resolve, reject)=>{
        try {
            let email = data.email
            let password = data.password
            let checkEmail = await getOneEmail(email);
      
            if(checkEmail.errCode == 1){
                let checkPassword =  bcrypt.compareSync(password,checkEmail.selectEmail.matKhau)
              
                if(checkPassword){
                    resolve({
                        errCode:1,
                        errMessage: 'Đăng nhập thành công',
                        user : checkEmail.selectEmail
                    }) 
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
let postRegisterService = (data)=>{
    return new Promise(async(resolve, reject)=>{
       
        try {
            const phoneNumber = /^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/;
            
            let firstName = data.firstName;
            let email = data.email;
            let gioitinh = parseInt(data.gioitinh);
            let lastName = data.lastName;
            let phone = data.phone;
            let anhDaiDien = "https://tse4.mm.bing.net/th?id=OIP.eImXLrEHmxuAIYAz3_VKhAHaHt&pid=Api&P=0";
            let password = data.password;
            let re_password = data.re_password;
            let date = datetime.getdate()
            
            let checkEmail = await getOneEmail(email);
            if(checkEmail.errCode == 0){
                if(phoneNumber.test(phone)=== true){
                    if(gioitinh){
                        
                        if(password == re_password){
                            let hashPassword = await hashUserPassword(password)
                            
                            await sequelize.query(`
                            INSERT INTO members (tenThanhVien, email, gioiTinh, anhDaiDien,soDienThoai,	matKhau,status,createdAt)
                            VALUES ('${firstName + " "+lastName}', "${email}", ${gioitinh}, "${anhDaiDien}","${phone}","${hashPassword}",1,"${date}");
                            `, { type: QueryTypes.INSERT });
                           
                            resolve({ 
                                errCode:1,
                                errMessage: 'Bạn đã đăng kí tài khoản thành công, hãy quay trở lại phần đăng nhập để đăng nhập tài khoản của bạn',
                                
                             })
                        }else{
                            resolve({ 
                                errCode:0,
                                errMessage: 'Mật khẩu chưa giống nhau',
                                
                             })
                        }
                    }else{
                        resolve({ 
                            errCode:0,
                            errMessage: 'Bạn chưa chọn giới tính',
                            
                         })
                    }
                    
                }else{
                    resolve({ 
                        errCode:0,
                        errMessage: 'Số điện thoại không đúng định dạng',
                        
                     })
                }
            }else{
                resolve({ 
                    errCode:0,
                    errMessage: 'Tài khoản đã tồn tại',
                    
                 })
            }
            
           
        } catch (error) {
             reject(error);
        }
         
         
     }) 
}
let getNameUser = async()=>{
    return new Promise(async(resolve, reject)=>{
       try {
        //    let email = data.email
        //    let password = data.password
        //    let checkEmail = await getOneEmail(email);
     
        //    if(checkEmail.errCode == 1){
        //        let checkPassword =  bcrypt.compareSync(password,checkEmail.selectEmail.matKhau)
             
        //        if(checkPassword){
        //            resolve({
        //                errCode:1,
        //                errMessage: 'Đăng nhập thành công',
        //                user : checkEmail.selectEmail
        //            }) 
        //        }else{
        //            resolve({
        //                errCode:0,
        //                errMessage: 'Mật khẩu không chính xác',
                       
        //            }) 
        //        }
               
        //    }else{
        //        resolve({
        //            errCode:0,
        //            errMessage: 'Email không tồn tại',
                   
        //        }) 
        //    }
          
           } catch (error) {
               reject(error);
       }
    }) 
   
}
module.exports  = {
    postRegisterService:postRegisterService,
    getOneEmail:getOneEmail,
    postLoginMemmberService:postLoginMemmberService,
    getOneUserInfoService:getOneUserInfoService,
    getNameUser:getNameUser

}