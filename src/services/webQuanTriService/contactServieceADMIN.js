const { QueryTypes } = require('sequelize');
// import sequelize from "../../src/config/queryDatabase"
import sequelize from "../../config/queryDatabse"
import datetime from "../webbanhangService/getdateService"
let handleGetContact = (data)=>{
    return new Promise(async(resolve, reject)=>{
        try {
            const data = await sequelize.query(`
                SELECT *
                FROM contact
                ORDER BY id DESC
                `, { type: QueryTypes.SELECT });
          
                resolve({ 
                    errCode:0,
                    errMessage: 'thành công',
                    data:data
                 })     
  
        } catch (error) {
             reject(error);
        }
     }) 
}


let handlePutPhanHoiContactSeviceADMIN = (data)=>{
    
    return new Promise(async(resolve, reject)=>{
        try {
            let id = data.id;
            let phanhoi = data.phanhoi; 
            let date = datetime.getdate()
             await sequelize.query(`
            UPDATE contact
            SET phanhoi_admin = '${phanhoi}', updatedAt = '${date}'
            WHERE id=${id};
                `, { type: QueryTypes.UPDATE });
          
                resolve({ 
                    errCode:0,
                    errMessage: 'thành công',
                 })     
  
        } catch (error) {
             reject(error);
        }
     }) 
}

let getUserWithPagination = (page)=>{
    return new Promise(async(resolve, reject)=>{
        try {
            let totalCount = await sequelize.query(`
                    SELECT COUNT(*) as total FROM  contact 
                        `, { type: QueryTypes.SELECT });
                    let pageNumber = page;
                   
                    let limit = 10; // Số lượng sản phẩm trên mỗi trang
                    let offset = (pageNumber - 1) * limit;
                    let  lienhe = await sequelize.query(`
                    SELECT * FROM  contact  order by id desc limit ${limit} OFFSET ${offset}
                        `, { type: QueryTypes.SELECT });
                    
                    let totalPages = Math.ceil(totalCount[0].total / limit);
                   
                    if(lienhe.length > 0 ){
                        resolve({ 
                            errCode:0,
                            errMessage: 'thành công',
                            lienhe:lienhe,
                            nameCategories: "Sản phẩm bán chạy nhất",
                            totalCount:totalPages
                        })
                    }    
  
        } catch (error) {
             reject(error);
        }
     }) 
}







module.exports  = {
    handleGetContact:handleGetContact,
    handlePutPhanHoiContactSeviceADMIN:handlePutPhanHoiContactSeviceADMIN,
    getUserWithPagination:getUserWithPagination,
}