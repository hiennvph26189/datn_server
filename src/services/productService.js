const { QueryTypes } = require('sequelize');
// import sequelize from "../../src/config/queryDatabase"
import sequelize from "../config/queryDatabse"
let getSanPhamService = (data)=>{
    return new Promise(async(resolve, reject)=>{
       
        try {
            const listSanPham = await sequelize.query(`
                SELECT *
                FROM products
                ORDER BY id DESC
                `, { type: QueryTypes.SELECT });
          console.log(listSanPham)
                resolve({ 
                    errCode:0,
                    errMessage: 'thành công',
                    listSanPham:listSanPham
                 })     
  
        } catch (error) {
             reject(error);
        }
         
         
     }) 
}
module.exports  = {
    getSanPhamService:getSanPhamService

}