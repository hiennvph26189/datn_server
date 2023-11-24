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
            SELECT id,tenSp,giaSanPham,sale,image FROM  products  order by id desc limit 12
                `, { type: QueryTypes.SELECT });
               
                resolve({ 
                    errCode:0,
                    errMessage: 'thành công',
                    newProducts:newProducts,
                    
                 })
                      
  
        } catch (error) {
             reject(error);
        }
         
         
     }) 
}
let getProductsSaleService = ()=>{
    return new Promise(async(resolve, reject)=>{
       
        try {

            let  productsSales = await sequelize.query(`
            SELECT id,tenSp,giaSanPham,sale,image FROM  products where sale > 15 or sale = 15 order by sale desc limit 12
                `, { type: QueryTypes.SELECT });
               
                resolve({ 
                    errCode:0,
                    errMessage: 'thành công',
                    productsSales:productsSales,
                    
                 })
                      
  
        } catch (error) {
             reject(error);
        }
         
         
     }) 
}
let getProductsOrderService = ()=>{
    return new Promise(async(resolve, reject)=>{
       
        try {

            let  productsOrders = await sequelize.query(`
            SELECT id,tenSp,giaSanPham,sale,image FROM  products  order by luotMua desc limit 12
                `, { type: QueryTypes.SELECT });
               
                resolve({ 
                    errCode:0,
                    errMessage: 'thành công',
                    productsOrders:productsOrders,
                    
                 })
                      
  
        } catch (error) {
             reject(error);
        }
         
         
     }) 
}
let getCategoriesService = ()=>{
    return new Promise(async(resolve, reject)=>{
       
        try {

            let  results = await sequelize.query(`
            SELECT categories.id AS category_id, categories.name, products.id AS product_id, products.tenSp, products.idDanhSach, products.giaSanPham,products.sale,products.image
            FROM categories
             JOIN products ON categories.id = products.idDanhSach 
                `, { type: QueryTypes.SELECT });
            // let arrData = []
            const combinedArray = [];
            let currentCategory = null;
          
                        for (const row of results) {
                        if (row.category_id !== currentCategory) {
                            currentCategory = row.category_id;
                            combinedArray.push({
                            id: row.category_id,
                            name: row.name,
                            products: []
                            });
                            // combinedArray.push( row);
                        }
                    
                        if (row.product_id) {
                            combinedArray[combinedArray.length - 1].products.push({
                            id: row.product_id,
                            tenSp: row.tenSp,
                            sale: row.sale,
                            idDanhSach: row.idDanhSach,
                            giaSanPham: row.giaSanPham.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }),
                            giaBanSale: (row.giaSanPham-(row.giaSanPham*(row.sale/100))).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }),
                            image: JSON.parse(row.image)[0] 
                            });
                        }
                        }
                resolve (
                    { 
                        errCode:0,
                        errMessage: 'thành công',
                        data:combinedArray,
                    }
                    )
           
                      
  
        } catch (error) {
             reject(error);
        }
         
         
     }) 
}

let getOneProductService = (id)=>{
    return new Promise(async(resolve, reject)=>{
       
        try {

            let  getOneProduct = await sequelize.query(`
            SELECT * FROM  products  where id = '${id}'
                `, { type: QueryTypes.SELECT });
               
            if(getOneProduct.length > 0) {
                resolve({ 
                    errCode:0,
                    errMessage: 'thành công',
                    getOneProduct:getOneProduct,
                    
                 })
            }else{
                resolve({ 
                    errCode:1,
                    errMessage: 'Sản phẩm không tồn tại',
                    getOneProduct:{},
                    
                 })  
            }
               
                      
  
        } catch (error) {
             reject(error);
        }
         
         
     }) 
}

module.exports  = {
    getSanPhamBanChayProductsService:getSanPhamBanChayProductsService,   
    getNewProductsService:getNewProductsService,
    getProductsSaleService:getProductsSaleService,
    getProductsOrderService:getProductsOrderService,
    getOneProductService:getOneProductService,
    getCategoriesService:getCategoriesService,
    
}