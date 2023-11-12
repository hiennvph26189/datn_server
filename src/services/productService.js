const { QueryTypes } = require('sequelize');
// import sequelize from "../../src/config/queryDatabase"
import sequelize from "../config/queryDatabse"
let handleGetProduct = (data)=>{
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

let handleAddProductServices = (data)=>{
    return new Promise(async(resolve, reject)=>{
       
        try {
            let name = data.name;
            let date = new Date();
             await sequelize.query(`
             INSERT INTO products (tenSp, hangSx, updatedAt)
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
let handlePutProductServices = (data)=>{
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
let handleDeleteProductServices = (data)=>{
    return new Promise(async(resolve, reject)=>{
       
        try {
            let selectIdProduct = await sequelize.query(`
            SELECT *
            FROM products
            WHERE id=${data.id}
            `, { type: QueryTypes.SELECT });

            if (selectIdProduct.length>0) {
                let id = data.id;
                 await sequelize.query(`
                 DELETE FROM products WHERE id=${id}
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
module.exports  = {
    handleGetProduct:handleGetProduct,
    handleDeleteProductServices:handleDeleteProductServices
}