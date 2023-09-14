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
            
            if(parseInt(id)>0){
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
            }else{
                if(id=='san-pham-ban-chay'){
                    let totalCount = await sequelize.query(`
            SELECT COUNT(*) as total FROM  products where luotMua >1 
                `, { type: QueryTypes.SELECT });
            let pageNumber = page;
            let limit = 6; // Số lượng sản phẩm trên mỗi trang
            let offset = (pageNumber - 1) * limit;
            let  products = await sequelize.query(`
            SELECT id,tenSp,giaSanPham,sale,image,luotMua FROM  products where luotMua >1  order by luotMua desc limit ${limit} OFFSET ${offset}
                `, { type: QueryTypes.SELECT });
            
            let totalPages = Math.ceil(totalCount[0].total / limit);
           
            if(products.length > 0 ){
                resolve({ 
                    errCode:0,
                    errMessage: 'thành công',
                    products:products,
                    nameCategories: "Sản phẩm bán chạy nhất",
                    totalCount:totalPages
                 })
            }
                }
            }
            
                
                      
  
        } catch (error) {
             reject(error);
        }
         
         
     }) 
}
let getSapXepDanhSachSanPhamIdService = (id,page,value)=>{
    return new Promise(async(resolve, reject)=>{
       
        try {
            let arrProducts = []
            let nameCategories =  await sequelize.query(`
            SELECT name FROM  categories where id = ${id} 
                `, { type: QueryTypes.SELECT });
           
            let totalCount = await sequelize.query(`
            SELECT COUNT(*) as total FROM  products where idDanhSach = ${id} 
                `, { type: QueryTypes.SELECT });
            let pageNumber = page;
            let limit = 6; // Số lượng sản phẩm trên mỗi trang
            let offset = (pageNumber - 1) * limit;
            if(value =="null"){
                let  products = await sequelize.query(`
                SELECT id,tenSp,giaSanPham,sale,image,luotMua FROM  products where idDanhSach = ${id} order by id desc limit ${limit} OFFSET ${offset}
                    `, { type: QueryTypes.SELECT });
                    arrProducts = products
            }else if(value =="alpha-asc"){
                let  products = await sequelize.query(`
                SELECT id,tenSp,giaSanPham,sale,image,luotMua FROM  products where idDanhSach = ${id} order by tenSp asc limit ${limit} OFFSET ${offset}
                    `, { type: QueryTypes.SELECT });
                    arrProducts = products
            }else if(value =="alpha-desc"){
                let  products = await sequelize.query(`
                SELECT id,tenSp,giaSanPham,sale,image,luotMua FROM  products where idDanhSach = ${id} order by tenSp desc limit ${limit} OFFSET ${offset}
                    `, { type: QueryTypes.SELECT });
                    arrProducts = products
            }else if(value =="price-asc"){
                let  products = await sequelize.query(`
                SELECT id,tenSp,giaSanPham,sale,image,luotMua FROM  products where idDanhSach = ${id} order by giaSanPham asc limit ${limit} OFFSET ${offset}
                    `, { type: QueryTypes.SELECT });
                    arrProducts = products
            }else if(value =="price-desc"){
                let  products = await sequelize.query(`
                SELECT id,tenSp,giaSanPham,sale,image,luotMua FROM  products where idDanhSach = ${id} order by giaSanPham desc limit ${limit} OFFSET ${offset}
                    `, { type: QueryTypes.SELECT });
                    arrProducts = products
            }else if(value =="created-desc"){
                let  products = await sequelize.query(`
                SELECT id,tenSp,giaSanPham,sale,image,luotMua FROM  products where idDanhSach = ${id} order by id desc limit ${limit} OFFSET ${offset}
                    `, { type: QueryTypes.SELECT });
                    arrProducts = products
            }else if(value =="created-asc"){
                let  products = await sequelize.query(`
                SELECT id,tenSp,giaSanPham,sale,image,luotMua FROM  products where idDanhSach = ${id} order by id asc limit ${limit} OFFSET ${offset}
                    `, { type: QueryTypes.SELECT });
                    arrProducts = products
            }
           
            
            
            let totalPages = Math.ceil(totalCount[0].total / limit);
           
            if(arrProducts.length > 0 && nameCategories.length >0){
                resolve({ 
                    errCode:0,
                    errMessage: 'thành công',
                    products:arrProducts,
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
    getDanhSachSanPhamIdService:getDanhSachSanPhamIdService,
    getSapXepDanhSachSanPhamIdService:getSapXepDanhSachSanPhamIdService
}