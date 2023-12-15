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
                        UPDATE address
                        SET status = "HIDDEN"
                        WHERE id='${id}';
                        `, { type: QueryTypes.UPDATE });
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
                        WHERE id_members = '${id_member}' and status !="HIDDEN";
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
let GetTinhThanhService = ()=>{
    return new Promise(async(resolve, reject)=>{
       
        try {
            const listTinhThanh = await sequelize.query(`
                SELECT *
                FROM province
                ORDER BY _name ASC 
                `, { type: QueryTypes.SELECT });
          
                resolve({ 
                    errCode:0,
                    errMessage: 'thành công',
                    listTinhThanh:listTinhThanh
                 })     
  
        } catch (error) {
             reject(error);
        }
         
         
     }) 
}
let GetQuanService = (tinh)=>{
    return new Promise(async(resolve, reject)=>{
       
        try {
            const listQuan = await sequelize.query(`
                SELECT *
                FROM district
                WHERE _province_id = ${tinh}
                ORDER BY _name ASC 
                `, { type: QueryTypes.SELECT });
          
                resolve({ 
                    errCode:0,
                    errMessage: 'thành công',
                    listQuan:listQuan
                 })     
  
        } catch (error) {
             reject(error);
        }
         
         
     }) 
}
let GetXaService = (tinh,quan)=>{
    return new Promise(async(resolve, reject)=>{
       
        try {
            const listXa = await sequelize.query(`
            SELECT *
            FROM ward
            WHERE _province_id = ${tinh}
            AND _district_id = ${quan}
            ORDER BY _name ASC;
                `, { type: QueryTypes.SELECT });
          
                resolve({ 
                    errCode:0,
                    errMessage: 'thành công',
                    listXa:listXa
                 })     
  
        } catch (error) {
             reject(error);
        }
         
         
     }) 
}
let GetAddressService = (id_member)=>{
    return new Promise(async(resolve, reject)=>{
       
        try {
          
            let  oneMember = await sequelize.query(`
            SELECT * FROM  members WHERE id = '${id_member}'
                `, { type: QueryTypes.SELECT });
                if (oneMember.length>0) {
                    const listAddress = await sequelize.query(`
                    SELECT *
                    FROM address WHERE id_members = '${id_member}' and status != "HIDDEN"
                    ORDER BY status DESC 
                    `, { type: QueryTypes.SELECT });
              
                    resolve({ 
                        errCode:0,
                        errMessage: 'thành công',
                        listAddress:listAddress
                     })   
                }else{
                    resolve({ 
                        errCode:0,
                        errMessage: 'Không có địa chỉ',
                        listAddress:[]
            
                     })   
                }
            
  
        } catch (error) {
             reject(error);
        }
         
         
     }) 
}
let getItemAddressInIdMemberService = (id_member)=>{
    return new Promise(async(resolve, reject)=>{
       
        try {
      
            let  oneMember = await sequelize.query(`
            SELECT * FROM  members WHERE id = '${id_member}'
                `, { type: QueryTypes.SELECT });
                if (oneMember.length>0) {
                    const listAddress = await sequelize.query(`
                    SELECT *
                    FROM address WHERE id_members = '${id_member}'
                   and status = "MAC-DINH"
                    `, { type: QueryTypes.SELECT });
                if(listAddress.length>0){
                    resolve({ 
                        errCode:0,
                        errMessage: 'thành công',
                        itemAddress:listAddress[0]
                     }) 
                }else{
                    resolve({ 
                        errCode:1,
                        errMessage: 'Chưa chọn địa chỉ',
                        itemAddress:{}
                     }) 
                }
                     
                }else{
                    resolve({ 
                        errCode:1,
                        errMessage: 'Không có member',
            
                     })   
                }
            
  
        } catch (error) {
             reject(error);
        }
         
         
     }) 
}
let getItemAddressOrderDetailService = (id_address)=>{
    return new Promise(async(resolve, reject)=>{
       
        try {
            console.log(id_address);
                if(id_address >0){
                    const listAddress = await sequelize.query(`
                    SELECT *
                    FROM address WHERE id = '${id_address}'
               
                    `, { type: QueryTypes.SELECT });
                if(listAddress.length > 0){
                    resolve({ 
                        errCode:0,
                        errMessage: 'thành công',
                        itemAddress:listAddress[0]
                     })   
                }else{
                    resolve({ 
                        errCode:1,
                        errMessage: 'Thất bại',
                        itemAddress:[]
                     })   
                }
                }else{
                    resolve({ 
                        errCode:1,
                        errMessage: 'chưa có địa chỉ',
                        itemAddress:[]
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
    EditStatusAddressService:EditStatusAddressService,
    GetTinhThanhService:GetTinhThanhService,
    GetQuanService:GetQuanService,
    GetXaService:GetXaService,
    GetAddressService:GetAddressService,
    getItemAddressInIdMemberService:getItemAddressInIdMemberService,
    getItemAddressOrderDetailService:getItemAddressOrderDetailService
    
}