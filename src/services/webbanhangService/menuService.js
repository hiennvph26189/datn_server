const { QueryTypes } = require('sequelize');
// import sequelize from "../../src/config/queryDatabase"
import sequelize from "../../config/queryDatabse"
let getCategoriesService = ()=>{
    return new Promise(async(resolve, reject)=>{
       
        try {

            let  data1 = await sequelize.query(`
            SELECT * FROM  categories 
                `, { type: QueryTypes.SELECT });
               
               
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
let getDanhSachSanPhamIdService = (id,page)=>{
    return new Promise(async(resolve, reject)=>{
       
        try {
            let nameCategories =  await sequelize.query(`
            SELECT name FROM  categories where id = ${id} 
                `, { type: QueryTypes.SELECT });
           
            let totalCount = await sequelize.query(`
            SELECT COUNT(*) as total FROM  products where idDanhSach = ${id} 
                `, { type: QueryTypes.SELECT });
            let pageNumber = page;
            let limit = 6; // Số lượng sản phẩm trên mỗi trang
            let offset = (pageNumber - 1) * limit;
            let  products = await sequelize.query(`
            SELECT id,tenSp,giaSanPham,sale,image,luotMua FROM  products where idDanhSach = ${id} order by id desc limit ${limit} OFFSET ${offset}
                `, { type: QueryTypes.SELECT });
            
            let totalPages = Math.ceil(totalCount[0].total / limit);
           
            if(products.length > 0 && nameCategories.length >0){
                resolve({ 
                    errCode:0,
                    errMessage: 'thành công',
                    products:products,
                    nameCategories: nameCategories[0].name,
                    totalCount:totalPages
                 })
            }
                
                      
  
        } catch (error) {
             reject(error);
        }
         
         
     }) 
}

module.exports  = {
    getCategoriesService:getCategoriesService,   
    getDanhSachSanPhamIdService:getDanhSachSanPhamIdService
}