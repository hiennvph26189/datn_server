const { QueryTypes } = require('sequelize');
// import sequelize from "../../src/config/queryDatabase"
import sequelize from "../../config/queryDatabse"
import datetime from "../webbanhangService/getdateService"


let postDataAddressService = (data)=>{
    return new Promise(async(resolve, reject)=>{
       
        try {
            let id_member = parseInt(data.id_member)
            let hoTen = data.hoTen
            let soDienThoai = data.soDienThoai
            let diaChi = data.diaChi
            let date = datetime.getdate()
            let  oneMember = await sequelize.query(`
            SELECT * FROM  members WHERE id = ${id_member}
                `, { type: QueryTypes.SELECT });
                     if (oneMember.length>0) {
                        await sequelize.query(`
                        INSERT INTO address (id_members, hoTen, soDienThoai, diaChi, status, createdAt)
                        VALUES (${id_member}, "${hoTen}","${soDienThoai}","${diaChi}","KHONG-MAC-DINH","${date}");
                        `, { type: QueryTypes.INSERT });
                            resolve({ 
                                errCode:0,
                                errMessage: 'thành công',
                             })
                     }else{
                        resolve({ 
                            errCode:1,
                            errMessage: 'người dùng không tồn tại ',
                         })
                     }

        } catch (error) {
             reject(error);
        }
         
         
     }) 
}
let deleteAddressService = (data)=>{
    return new Promise(async(resolve, reject)=>{
        try {
            let id = parseInt(data.id) 
            let id_member = parseInt(data.id_member)
                    let  oneAddress = await sequelize.query(`
                    SELECT * FROM  address WHERE id_members = '${id_member}';
                        `, { type: QueryTypes.SELECT });
                     if (oneAddress.length>0) {
                        await sequelize.query(`
                        DELETE FROM address
                        WHERE id= '${id}'
                        `, { type: QueryTypes.DELETE });
                            resolve({ 
                                errCode:0,
                                errMessage: 'xóa thành công',
                             })
                     }else{
                        resolve({ 
                            errCode:1,
                            errMessage: 'người dùng không tồn tại ',
                         })
                     }

        } catch (error) {
             reject(error);
        }
         
         
     }) 
}
let putAddressService = (data)=>{
    return new Promise(async(resolve, reject)=>{
        try {
            let id = parseInt(data.id) 
            let id_member = parseInt(data.id_member)
            let hoTen = data.hoTen
            let soDienThoai = data.soDienThoai
            let diaChi = data.diaChi
            let date = datetime.getdate()
                    let  oneAddress = await sequelize.query(`
                    SELECT * FROM  address WHERE id = '${id}' AND id_members = '${id_member}';
                        `, { type: QueryTypes.SELECT });
                     if (oneAddress.length>0) {
                        await sequelize.query(`
                        UPDATE address
                        SET hoTen = '${hoTen}',soDienThoai = '${soDienThoai}',diaChi = '${diaChi}', updatedAt = '${date}'
                        WHERE id='${id}';
                    `, { type: QueryTypes.UPDATE });
                            resolve({ 
                                errCode:0,
                                errMessage: 'update thành công',
                             })
                     }else{
                        resolve({ 
                            errCode:1,
                            errMessage: 'người dùng không tồn tại ',
                         })
                     }

        } catch (error) {
             reject(error);
        }
         
         
     }) 
}
let EditStatusAddressService = (data)=>{
    return new Promise(async(resolve, reject)=>{
        try {
            let id = parseInt(data.id) 
            let id_member = parseInt(data.id_member)
            let date = datetime.getdate()
                    let  oneAddress = await sequelize.query(`
                    SELECT * FROM  address WHERE id = '${id}' AND id_members = '${id_member}';
                        `, { type: QueryTypes.SELECT });
                     if (oneAddress.length>0) {
                        await sequelize.query(`
                        UPDATE address
                        SET status = 'KHONG-MAC-DINH', updatedAt = '${date}'
                        WHERE id_members = '${id_member}';
                    `, { type: QueryTypes.UPDATE });
                    await sequelize.query(`
                    UPDATE address
                    SET status = 'MAC-DINH', updatedAt = '${date}'
                    WHERE id = '${id}';
                `, { type: QueryTypes.UPDATE });
                            resolve({ 
                                errCode:0,
                                errMessage: 'update thành công',
                             })
                     }else{
                        resolve({ 
                            errCode:1,
                            errMessage: 'người dùng không tồn tại ',
                         })
                     }

        } catch (error) {
             reject(error);
        }
         
         
     }) 
}
module.exports={
    postDataAddressService:postDataAddressService,
    deleteAddressService:deleteAddressService,
    putAddressService:putAddressService,
    EditStatusAddressService:EditStatusAddressService
    
}