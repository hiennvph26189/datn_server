const { QueryTypes } = require('sequelize');

import sequelize from "../../config/queryDatabse"
import dateTime from "../getDate";
let getConvertArrProduct = (arrData)=>{
    const newArray = arrData.map(item => {
      return {
        ...item,
        giaSanPham: item.giaSanPham.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }),
        giaBanSale: (item.giaSanPham-(item.giaSanPham*(item.sale/100))).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }),
        image: JSON.parse(item.image)[0] // Chỉ lấy phần tử đầu tiên của mảng img
      };
    }); 
    return newArray
  }

let handleGetHotSaleProductServices = ()=>{
    return new Promise(async(resolve, reject)=>{
        try {
            const data = await sequelize.query(`
                SELECT *
                FROM products
                WHERE sale > 10 ORDER BY sale DESC limit 10
                `, { type: QueryTypes.SELECT });
          if (data.length>0) {
            let newData = await getConvertArrProduct(data);
            resolve({ 
                errCode:0,
                errMessage: 'thành công',
                saleProduct:data
             })   
          }else{
            resolve({ 
                errCode:1,
                errMessage: 'thất bại',
                saleProduct:[]
             })   
          }

                 
  
        } catch (error) {
             reject(error);
        }
     }) 
}
let handleGetHotOrdersProductServices = ()=>{
    return new Promise(async(resolve, reject)=>{
        try {
            const data = await sequelize.query(`
                SELECT *
                FROM products
                WHERE luotMua > 2 ORDER BY luotMua DESC limit 10
                `, { type: QueryTypes.SELECT });
          if (data.length>0) {
            let newData = await getConvertArrProduct(data);
            resolve({ 
                errCode:0,
                errMessage: 'thành công',
                hotOrdersProducts:data
             })   
          }else{
            resolve({ 
                errCode:1,
                errMessage: 'thất bại',
                hotProduct:[]
             })   
          }

                 
  
        } catch (error) {
             reject(error);
        }
     }) 
}
let handleGetCategoriesInProductsServices = ()=>{
    return new Promise(async(resolve, reject)=>{
      try {

              let  results = await sequelize.query(`
              SELECT categories.id AS category_id, categories.name, products.id AS product_id, products.tenSp, products.idDanhSach, products.giaSanPham,products.sale,products.image,products.luotMua
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
                        luotMua: row.luotMua,
                        idDanhSach: row.idDanhSach,
                        giaSanPham: row.giaSanPham,
                        giaBanSale: (row.giaSanPham-(row.giaSanPham*(row.sale/100))).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }),
                        image: row.image
                        });
                    }
                    }
              resolve (
                  { 
                      errCode:0,
                      errMessage: 'thành công',
                      dataProducts:combinedArray,
                  }
                )
       
                  

    } catch (error) {
         reject(error);
    }
     }) 
}
module.exports  = {
    handleGetHotOrdersProductServices:handleGetHotOrdersProductServices,
    handleGetHotSaleProductServices:handleGetHotSaleProductServices,
    handleGetCategoriesInProductsServices:handleGetCategoriesInProductsServices

}