const { QueryTypes } = require('sequelize');
// import sequelize from "../../src/config/queryDatabase"
import sequelize from "../config/queryDatabse"
let handleGetProduct = (data)=>{
    return new Promise(async(resolve, reject)=>{
       
        try {
            const result = await sequelize.query(`
                SELECT *
                FROM products
                ORDER BY id DESC
                `, { type: QueryTypes.SELECT });
          
                resolve({ 
                    errCode:0,
                    errMessage: 'thành công',
                    result:result
                 })     
  
        } catch (error) {
             reject(error);
        }
         
         
     }) 
}
module.exports  = {
    handleGetProduct:handleGetProduct
}