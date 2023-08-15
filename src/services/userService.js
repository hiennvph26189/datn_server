const { QueryTypes } = require('sequelize');
// import sequelize from "../../src/config/queryDatabase"
import sequelize from "../config/queryDatabse"
let handleGetUser = ()=>{
    return new Promise(async(resolve, reject)=>{
       
        try {
           
           
           
            const data = await sequelize.query(`
            SELECT name FROM  categories 
                `, { type: QueryTypes.SELECT });
                // SELECT products.id, products.tenSp, categories.name AS 'TenDanhSach' FROM  products INNER  JOIN  categories  ON  categories.id = products.idDanhSach  where products.idDanhSach = 51
                resolve({ 
                    // errCode:0,
                    // errMessage: 'thành công',
                    data:data
                 })
                      
  
        } catch (error) {
             reject(error);
        }
         
         
     }) 
}
module.exports  = {
    handleGetUser:handleGetUser

}