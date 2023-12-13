const { QueryTypes } = require('sequelize');
// import sequelize from "../../src/config/queryDatabase"
import sequelize from "../../config/queryDatabse"
let getSanPhamLienQuan = (idDanhSach,idSp)=>{
    return new Promise(async(resolve, reject)=>{
       
        try {
            const getIdCategory = await sequelize.query(`
                SELECT 
                name  
                FROM categories
                where id = ${idDanhSach}
                `, { type: QueryTypes.SELECT });
        
         const getSanPhamLienQuanId = await sequelize.query(`
                SELECT 
                *  
                FROM products
                where idDanhSach = ${idDanhSach} and status = 0  order by id DESC limit 12
                `, { type: QueryTypes.SELECT });
           
            if(getSanPhamLienQuanId.length > 0&& getIdCategory.length >0){
                resolve({ 
                    errCode:0,
                    errMessage: 'thành công',
                    getSanPhamLienQuanId:getSanPhamLienQuanId,
                    idDanhSach: idDanhSach,
                    tenDanhSach:getIdCategory[0].name

                 }) 
            }else{
                resolve({ 
                    errCode:1,
                    errMessage: 'Không có sản phẩm',
                    getSanPhamLienQuanId:{},
                    

                 })

            }  
           
          
                   
  
        } catch (error) {
             reject(error);
        }
         
         
     }) 
}
module.exports  = {
    getSanPhamLienQuan:getSanPhamLienQuan

}