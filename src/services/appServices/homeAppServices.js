const { QueryTypes } = require('sequelize');
// import sequelize from "../../src/config/queryDatabase"
import sequelize from "../../config/queryDatabse"
let handleGetProductServices = ()=>{
    return new Promise(async(resolve, reject)=>{
       
        try {
            const data = await sequelize.query(`
                SELECT *
                FROM products
                ORDER BY id DESC
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
let handleAddCategoryServices = (data)=>{
    return new Promise(async(resolve, reject)=>{
       
        try {
            let name = data.name;
            let date = new Date();
             await sequelize.query(`
             INSERT INTO categories (name, createdAt, updatedAt)
             VALUES ('${name}', '${date}', '${date}');
                `, { type: QueryTypes.INSERT });
          
                resolve({ 
                    errCode:0,
                    errMessage: 'thành công',
                 })     
  
        } catch (error) {
             reject(error);
        }
     }) 
}
let handlePutCategoryServices = (data)=>{
    return new Promise(async(resolve, reject)=>{
       
        try {
            let selectIdCategory = await sequelize.query(`
            SELECT *
            FROM categories
            WHERE id=${data.id}
            `, { type: QueryTypes.SELECT });

            if (selectIdCategory.length>0) {
                let id = data.id;
                let name = data.name;
                let date = new Date();
                 await sequelize.query(`
                 UPDATE categories
                 SET name = '${name}', updatedAt = '${date}'
                 WHERE id=${id};
                    `, { type: QueryTypes.UPDATE });
              
                    resolve({ 
                        errCode:0,
                        errMessage: 'thành công',
                     })  
            }else {
                resolve({ 
                    errCode:1,
                    errMessage: 'không tồn tại sản phẩm',
                 })  
            }
        } catch (error) {
             reject(error);
        }
     }) 
}
let handleDeleteCategoryServices = (data)=>{
    return new Promise(async(resolve, reject)=>{
       
        try {
            let selectIdCategory = await sequelize.query(`
            SELECT *
            FROM categories
            WHERE id=${data.id}
            `, { type: QueryTypes.SELECT });

            if (selectIdCategory.length>0) {
                let id = data.id;
                 await sequelize.query(`
                 DELETE FROM categories WHERE id=${id}
                    `, { type: QueryTypes.DELETE });
                console.log(id)
              
                    resolve({ 
                        errCode:0,
                        errMessage: 'thành công',
                     })  
            }else {
                resolve({ 
                    errCode:1,
                    errMessage: 'không tồn tại sản phẩm',
                 })  
            }
        } catch (error) {
             reject(error);
        }
     }) 
}
let handleGetCategoryServices = ()=>{
    return new Promise(async(resolve, reject)=>{
       
        try {
            const data = await sequelize.query(`
                SELECT *
                FROM categories
                ORDER BY id DESC
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
module.exports  = {
    handleGetProductServices:handleGetProductServices,
    handleAddCategoryServices:handleAddCategoryServices,
    handlePutCategoryServices:handlePutCategoryServices,
    handleDeleteCategoryServices:handleDeleteCategoryServices,
    handleGetCategoryServices:handleGetCategoryServices
}