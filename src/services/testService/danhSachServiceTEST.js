const { QueryTypes } = require('sequelize');
// import sequelize from "../../src/config/queryDatabase"
import sequelize from "../../config/queryDatabse"
let listDanhSachService = ()=>{
    return new Promise(async(resolve, reject)=>{
       
        try {
            
           
           
            let  data1 = await sequelize.query(`
            SELECT * FROM  categories 
                `, { type: QueryTypes.SELECT });
                console.log(data1);
                // SELECT products.id, products.tenSp, categories.name AS 'TenDanhSach' FROM  products INNER  JOIN  categories  ON  categories.id = products.idDanhSach  where products.idDanhSach = 51
                resolve({ 
                    errCode:0,
                    errMessage: 'thành công',
                    data:data1
                 })
                      
  
        } catch (error) {
             reject(error);
        }
         
         
     }) 
}
let AddDanhSachService = (dulieunhap)=>{
    return new Promise(async(resolve, reject)=>{
       
        try {
            let name1 =  dulieunhap.name;
            var today = new Date();
            let ngayTao = today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear();
            let  data1 = await sequelize.query(`
            INSERT INTO categories (name,createdAt)
            VALUES ('${name1}','${ngayTao}' );
                `, { type: QueryTypes.INSERT });
            //     console.log(data1);
                // SELECT products.id, products.tenSp, categories.name AS 'TenDanhSach' FROM  products INNER  JOIN  categories  ON  categories.id = products.idDanhSach  where products.idDanhSach = 51
                resolve({ 
                    errCode:0,
                    errMessage: 'thành công',
                    data:data1
                 })
                      
  
        } catch (error) {
             reject(error);
        }
         
         
     }) 
}
module.exports  = {
    listDanhSachService:listDanhSachService,
    AddDanhSachService:AddDanhSachService

}