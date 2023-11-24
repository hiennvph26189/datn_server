const { QueryTypes } = require('sequelize');
import sequelize from "../../config/queryDatabse"
import datetime from "../webbanhangService/getdateService"


let getSizesServiceADMIN = (id)=>{
    return new Promise(async(resolve, reject)=>{
       
        try {
            
            if(id){
                const getOneSizesADMIN = await sequelize.query(`
                SELECT S,M,L,XL,XXL
                FROM sizes where id_sp  = ${id}
                
                `, { type: QueryTypes.SELECT });
               
                if(getOneSizesADMIN.length >0){
                    resolve({ 
                        errCode:1,
                        errMessage: 'thành công',
                        data:getOneSizesADMIN[0]
                    })  
                }else{
                    resolve({ 
                        errCode:0,
                        errMessage: 'Không có',
                        data:{}
                    })  
                }
            }else{
                resolve({ 
                    errCode:0,
                    errMessage: 'Thất bại',
                    data:{}
                })  
            }
            
                  
  
        } catch (error) {
             reject(error);
        }
         
         
     }) 
}

module.exports  = {
    getSizesServiceADMIN:getSizesServiceADMIN,
    

}