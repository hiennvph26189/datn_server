const { QueryTypes } = require('sequelize');
// import sequelize from "../../src/config/queryDatabase"
import sequelize from "../../config/queryDatabse"
let getSanPhamBanChayProductsService = ()=>{
    return new Promise(async(resolve, reject)=>{
       
        try {

            let  data = await sequelize.query(`
            SELECT id,tenSp,giaSanPham,sale,image,luotMua FROM  products order by luotMua desc limit 6 
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
let getNewProductsService = ()=>{
    return new Promise(async(resolve, reject)=>{
       
        try {

            let  newProducts = await sequelize.query(`
            SELECT id,tenSp,giaSanPham,sale,image FROM  products order by luotMua desc limit 10
                `, { type: QueryTypes.SELECT });
               
                resolve({ 
                    errCode:0,
                    errMessage: 'thành công',
                    newProducts:newProducts
                 })
                      
  
        } catch (error) {
             reject(error);
        }
         
         
     }) 
}

module.exports  = {
    getSanPhamBanChayProductsService:getSanPhamBanChayProductsService,   
    getNewProductsService:getNewProductsService
}