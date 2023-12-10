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
let handleForGotAccountService = (email,keycode)=>{
    return new Promise(async(resolve, reject)=>{
       try {
        console.log(email,"SK:ADKS");
        let date = getdateService.getdate();
        const getCheckEmail = await sequelize.query(`
            SELECT *
            FROM key_email
            where email="${email}"
            `, { type: QueryTypes.SELECT });
        console.log(getCheckEmail.length);
        if(getCheckEmail.length >0){
         
            await sequelize.query(`
              DELETE FROM key_email WHERE email = '${email}'
              `, { type: QueryTypes.DELETE });
            await sequelize.query(`
            INSERT INTO key_email (email, code, time)
            VALUES ("${email}", "${keycode}", "${date}");
            `, { type: QueryTypes.INSERT });
            resolve({
                errCode: 0,
                errMessage:"Thành công"
            });
        }else{
            await sequelize.query(`
            INSERT INTO key_email (email, code, time)
            VALUES ("${email}", "${keycode}", "${date}");
            `, { type: QueryTypes.INSERT });
            resolve({
                errCode: 0,
                errMessage:"Thành công"
            });
        }
       
        
       

       } catch (error) {
            reject(error);
       }
        
        
    })
}
let handleXacMinhEmailService = (data)=>{
    return new Promise(async(resolve, reject)=>{
       try {
        let email = data.email
        let key_code = data.key_code
   
        const getCheckEmail = await sequelize.query(`
        SELECT *
        FROM key_email
        where email="${email}" and code = "${key_code}"
        `, { type: QueryTypes.SELECT });
        if(getCheckEmail.length>0){
            await sequelize.query(`
              DELETE FROM key_email WHERE email = '${email}'
              `, { type: QueryTypes.DELETE });
            resolve({
                errCode:0,
                errMessage:"Thành công"
            });
        }else{
            resolve({
                errCode:1,
                errMessage:"Mã xác minh không chính xác"
            });
        }
       

       } catch (error) {
            reject(error);
       }
        
        
    })
}
let handleLayLaiMatKhauMemberService = (data)=>{
    return new Promise(async(resolve, reject)=>{
       try {
        let email = data.email
        let password = data.password
   
        let checkEmail = await checkUserEmail(email)
        if(checkEmail == true){
            let hashPasswordFromBcrypt =  await hashUserPassword(password);
            await sequelize.query(`
            UPDATE members
            SET matkhau = "${hashPasswordFromBcrypt}"
          
            WHERE  email='${email}';
            `, { type: QueryTypes.UPDATE });
            resolve({
                errCode:0,
                errMessage:"Bạn đã lấy lại mật khẩu thành công, vui lòng đăng nhập lại bằng mật khẩu mới"
            })
        }else{
            resolve({
                errCode:1,
                errMessage:"Tài khoản của bạn không tồn tại"
            })
        }
       

       } catch (error) {
            reject(error);
       }
        
        
    })
}
let handleNapTienMenbersService = (data)=>{
    return new Promise(async(resolve, reject)=>{
       try {
        let idUser = data.id
        let data_9pay = data.data9Pay
        let date = getdateService.getdate()
        let [checkEmail] =  await sequelize.query(`
                    SELECT *
                    FROM members
                    where id=${idUser} 
                `, { type: QueryTypes.SELECT });
        if(checkEmail){
            
            await sequelize.query(`
            UPDATE members
            SET tienTk = tienTk + ${data_9pay.amount}
            WHERE  id=${idUser};
            `, { type: QueryTypes.UPDATE });
           let itemThanhToan =  await sequelize.query(`
            INSERT INTO thanhtoan (id_donhang, id_member, card_name, payment_no,invoice_no,amount,description,card_brand,card_number,method,status,created_at)
            VALUES (0, ${idUser}, "${data_9pay.card_info.card_name}", "${data_9pay.payment_no}","${data_9pay.invoice_no}","${data_9pay.amount}","${data_9pay.description}","${data_9pay.card_info.card_brand}","${data_9pay.card_info.card_number}","${data_9pay.method}",1,"${date}");
            `, { type: QueryTypes.INSERT })
            let idThanhToan = itemThanhToan[0]
            console.log(idThanhToan, "Let id thanh toán");
            await sequelize.query(`
            INSERT INTO prices (idUser, id_thanhtoan, tienNap,status,createdAt,updatedAt)
            VALUES (${idUser}, ${idThanhToan}, ${data_9pay.amount},1,"${date}","${date}");
            `, { type: QueryTypes.INSERT });
            resolve({
                errCode:0,
                errMessage:"Nạp tiền thành công"
            })
        }else{
            resolve({
                errCode:1,
                errMessage:"Tài khoản của bạn không tồn tại"
            })
        }
       

       } catch (error) {
            reject(error);
       }
        
        
    })
}
let handleDetailNapTienMenbersService = (id_thanhtoaname)=>{
    return new Promise(async(resolve, reject)=>{
       try {
           
          
            let [itemThanhToan] =  await sequelize.query(`
                    SELECT *
                    FROM thanhtoan
                    where id=${id_thanhtoaname} 
                `, { type: QueryTypes.SELECT });
                resolve({
                    errCode:0,
                    errMessage:"OK",
                    itemThanhToan: itemThanhToan
                })
       } catch (error) {
            reject(error);
       }
        
        
    })
}
module.exports  = {
    
    handleUserMembersLoginService:handleUserMembersLoginService,
    AddMembersService:AddMembersService,
    handleUserMembersChangePassService:handleUserMembersChangePassService,
    handleForGotAccountService:handleForGotAccountService,
    handleXacMinhEmailService:handleXacMinhEmailService,
    checkUserEmail:checkUserEmail,
    handleLayLaiMatKhauMemberService:handleLayLaiMatKhauMemberService,
    handleNapTienMenbersService:handleNapTienMenbersService,
    handleDetailNapTienMenbersService:handleDetailNapTienMenbersService
    
}