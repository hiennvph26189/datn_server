const { QueryTypes } = require('sequelize');
import db from "../../models/index";
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
let handleGetAllTotalProductsService = ()=>{
  return new Promise(async(resolve, reject)=>{
      try {
         
         
          let res = {}
          let categories = await db.Categories.findAll({
              order: [
                  ['id', 'DESC'],
                 
              ]
          });
          let totalProducts = await db.Products.findAll();
          let sanPhamMuaNhieu = await sequelize.query(`
          SELECT *
          FROM products
          Where luotMua > 0 
          ORDER BY luotMua DESC
          LIMIT 7
          
          `, { type: QueryTypes.SELECT }); 
         
          let sale = await sequelize.query(`
          SELECT *
          FROM products
          Where sale > 25 
          ORDER BY sale DESC
          LIMIT 7
          
          `, { type: QueryTypes.SELECT }); 
          res.errCode = 0;
          res.errMessage = "OK",
          res.categories = categories;
          res.totalProducts = totalProducts;
          res.sanPhamMuaNhieu = sanPhamMuaNhieu;
          res.sale = sale;
          
          resolve(res)
          
       resolve(res);

      } catch (error) {
           reject(error);
      }
       
       
   }) 
}
let handleGetOneProductService = (id)=>{
  return new Promise(async(resolve, reject)=>{
      try {
       let products = await  db.Products.findOne({
          where: {id: id},
          
          
       });
       let arProduct = await  db.Products.findAll(
          {
              where: {idDanhSach : products.idDanhSach,
              },
              limit: 5,
              order: [
                  ['id', 'DESC'],
                 
              ]
            
                  
          }

       );
       if(!products){
          resolve({
              errCode: 2,
              errMessage: 'sản phẩm không tồn tại',
          })
         
       }else{
           resolve({
              errCode:0,
              errMessage: ' thành công',
              getDetailProduct: products,
              arProduct:arProduct
           })
       }
       
       

      } catch (error) {
           reject(error);
      }
       
       
   }) 
}
let listSizeInproductServiceApp = (id)=>{
    return new Promise(async(resolve, reject)=>{
        try {
            let getOneProduct = await sequelize.query(`
            SELECT * FROM  products where  id = ${id}
            `, { type: QueryTypes.SELECT });
            if(getOneProduct.length>0){
                let getOneSizes = await sequelize.query(`
                                SELECT S,M,L,XL,XXL  FROM sizes  WHERE id_sp = ${id}
                       
                       
                    `, { type: QueryTypes.SELECT });
                if(getOneSizes.length > 0) {
                        let inputArray  = getOneSizes[0]
                        const filteredSizes = Object.entries(inputArray)
                        .filter(([size, quantity]) => quantity > 0)
                        .reduce((acc, [size, quantity]) => {
                            acc[size] = quantity;
                            return acc;
                        }, {});
                        if(Object.values(filteredSizes).length != 0){
                            resolve({
                                errCode: 0,
                                errMessage: 'Thành công',
                                data:filteredSizes
                            })
                        }else{
                            resolve({
                                errCode: 1,
                                errMessage: 'sản phẩm đã hết hàng',
                                data:filteredSizes
                            })
                        }
                       
                 }else{
                    resolve({
                        errCode: 1,
                        errMessage: 'Sản phẩm hiện không có size',
                        data:{}
                    })
                 }
            }else{
                resolve({
                    errCode: 1,
                    errMessage: 'sản phẩm không tồn tại',
                })
            }
           
           
  
        } catch (error) {
             reject(error);
        }
         
         
     }) 
  }
  let listSizeInCartInProductServiceApp = (id,id_product)=>{
    return new Promise(async(resolve, reject)=>{
        try {
            let id_cart =  id
           
            let results = await sequelize.query(`
                SELECT 
                products.id as id_product,
                products.tenSp,
                products.giaSanPham,
                products.sale,
                products.image,
                carts.id as id_cart,
                carts.size,
                carts.soLuong,
                carts.thanhTien,
                sizes.id as id_size,
                sizes.S,
                sizes.M,
                sizes.L,
                sizes.XL,
                sizes.XXL
                FROM carts
                INNER JOIN 
                    products ON carts.ipSanPham = products.id
                INNER JOIN 
                sizes ON sizes.id_sp = products.id
                where products.id = ${id_product} and carts.id = ${id_cart}
                 `, { type: QueryTypes.SELECT });
                    console.log(results);
                    if (results.length > 0) {
                        const data = {
                          products: results.map(row => ({
                            id_product: row.id_product,
                            tenSp: row.tenSp,
                            giaSanPham: row.giaSanPham,
                            sale: row.sale,
                            image: row.image,
                            // Thêm các trường khác của products
                          })),
                          carts: results.map(row => ({
                            id_cart: row.id_cart,
                            size_name: row.size,
                            soLuong: row.soLuong,
                            thanhTien: row.thanhTien,
                            // Thêm các trường khác của carts
                          })),
                          sizes: results.map(row => ({
                            id_size: row.id_size,
                            size: {
                                S:row.S,
                                M:row.M,
                                L:row.L,
                                XL:row.XL,
                                XXL:row.XXL
                            }
                                
                           
                           
                            
                            // Thêm các trường khác của sizes
                          })),
                        };
                    
                        resolve({
                            errCode: 0,
                            errMessage: 'Thành công',
                            data:data
                        })
                      } else {
                        resolve({
                            errCode: 1,
                            errMessage: 'sản phẩm không tồn tại',
                            data:{}
                        })
                      }
                    
        } catch (error) {
             reject(error);
        }
         
         
     }) 
  }
module.exports  = {
    handleGetHotOrdersProductServices:handleGetHotOrdersProductServices,
    handleGetHotSaleProductServices:handleGetHotSaleProductServices,
    handleGetCategoriesInProductsServices:handleGetCategoriesInProductsServices,
    handleGetAllTotalProductsService:handleGetAllTotalProductsService,
    handleGetOneProductService:handleGetOneProductService,
    listSizeInproductServiceApp:listSizeInproductServiceApp,
    listSizeInCartInProductServiceApp:listSizeInCartInProductServiceApp

}