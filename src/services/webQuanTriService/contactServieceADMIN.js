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




module.exports  = {
    handleGetContact:handleGetContact,
    handlePutPhanHoiContactSeviceADMIN:handlePutPhanHoiContactSeviceADMIN,
}