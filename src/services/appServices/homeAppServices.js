const { QueryTypes } = require('sequelize');
// import sequelize from "../../src/config/queryDatabase"
import sequelize from "../../config/queryDatabse"
import dateTime from "../getDate";
import setToken from "./getToken";
let getConvertArrProduct = (arrData) => {
    const newArray = arrData.map(item => {
        return {
            ...item,
            giaSanPham: item.giaSanPham.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }),
            giaBanSale: (item.giaSanPham - (item.giaSanPham * (item.sale / 100))).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }),
            image: JSON.parse(item.image)[0] // Chỉ lấy phần tử đầu tiên của mảng img
        };
    });
    return newArray
}
let handleGetProductServices = () => {
    return new Promise(async (resolve, reject) => {

        try {
            const data = await sequelize.query(`
                SELECT *
                FROM products
                ORDER BY id DESC
                `, { type: QueryTypes.SELECT });

            resolve({
                errCode: 0,
                errMessage: 'thành công',
                data: data
            })

        } catch (error) {
            reject(error);
        }
    })
}
let handleAddCategoryServices = (data) => {
    return new Promise(async (resolve, reject) => {

        try {
            let name = data.name;
            let date = dateTime.getdate();
            console.log(date);
            await sequelize.query(`
             INSERT INTO categories (name, createdAt, updatedAt)
             VALUES ('${name}', '${date}', '${date}');
                `, { type: QueryTypes.INSERT });

            resolve({
                errCode: 0,
                errMessage: 'thành công',
            })

        } catch (error) {
            reject(error);
        }
    })
}
let handlePutCategoryServices = (data) => {
    return new Promise(async (resolve, reject) => {

        try {
            let selectIdCategory = await sequelize.query(`
            SELECT *
            FROM categories
            WHERE id=${data.id}
            `, { type: QueryTypes.SELECT });

            if (selectIdCategory.length > 0) {
                let id = data.id;
                let name = data.name;
                let date = dateTime.getdate();
                await sequelize.query(`
                 UPDATE categories
                 SET name = '${name}', updatedAt = '${date}'
                 WHERE id=${id};
                    `, { type: QueryTypes.UPDATE });

                resolve({
                    errCode: 0,
                    errMessage: 'thành công',
                })
            } else {
                resolve({
                    errCode: 1,
                    errMessage: 'không tồn tại sản phẩm',
                })
            }
        } catch (error) {
            reject(error);
        }
    })
}
let handleDeleteCategoryServices = (data) => {
    return new Promise(async (resolve, reject) => {

        try {
            let selectIdCategory = await sequelize.query(`
            SELECT *
            FROM categories
            WHERE id=${data.id}
            `, { type: QueryTypes.SELECT });

            if (selectIdCategory.length > 0) {
                let id = data.id;
                await sequelize.query(`
                 DELETE FROM categories WHERE id=${id}
                    `, { type: QueryTypes.DELETE });
                console.log(id)

                resolve({
                    errCode: 0,
                    errMessage: 'thành công',
                })
            } else {
                resolve({
                    errCode: 1,
                    errMessage: 'không tồn tại sản phẩm',
                })
            }
        } catch (error) {
            reject(error);
        }
    })
}
let handleGetCategoryServices = () => {
    return new Promise(async (resolve, reject) => {

        try {
            const data = await sequelize.query(`
                SELECT *
                FROM categories
                ORDER BY id DESC
                `, { type: QueryTypes.SELECT });

            resolve({
                errCode: 0,
                errMessage: 'thành công',
                data: data
            })

        } catch (error) {
            reject(error);
        }
    })
}
let handleGetHotProductServices = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const data = await sequelize.query(`
                SELECT *
                FROM products
                WHERE luotMua > 1 ORDER BY id DESC limit 10
                `, { type: QueryTypes.SELECT });
            if (data.length > 0) {
                let newData = await getConvertArrProduct(data);
                resolve({
                    errCode: 0,
                    errMessage: 'thành công',
                    hotProduct: newData
                })
            } else {
                resolve({
                    errCode: 1,
                    errMessage: 'thất bại',
                    hotProduct: []
                })
            }



        } catch (error) {
            reject(error);
        }
    })
}
let handleGetSaleProductServices = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const data = await sequelize.query(`
                SELECT *
                FROM products
                WHERE sale > 10 ORDER BY id DESC limit 10
                `, { type: QueryTypes.SELECT });
            if (data.length > 0) {
                let newData = await getConvertArrProduct(data);
                resolve({
                    errCode: 0,
                    errMessage: 'thành công',
                    saleProduct: data
                })
            } else {
                resolve({
                    errCode: 1,
                    errMessage: 'thất bại',
                    saleProduct: []
                })
            }



        } catch (error) {
            reject(error);
        }
    })
}
let handleGetNewProductServices = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const data = await sequelize.query(`
                SELECT *
                FROM products
                WHERE id > 0 ORDER BY id DESC limit 10
                `, { type: QueryTypes.SELECT });
            if (data.length > 0) {
                let newData = await getConvertArrProduct(data);
                resolve({
                    errCode: 0,
                    errMessage: 'thành công',
                    newProduct: newData
                })
            } else {
                resolve({
                    errCode: 1,
                    errMessage: 'thất bại',
                    newProduct: []
                })
            }



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
                        data: combinedArray
                    }
                    )
           
                      
  
        } catch (error) {
             reject(error);
        }
         
         
     }) 
}
module.exports = {
    handleGetProductServices: handleGetProductServices,
    handleAddCategoryServices: handleAddCategoryServices,
    handlePutCategoryServices: handlePutCategoryServices,
    handleDeleteCategoryServices: handleDeleteCategoryServices,
    handleGetCategoryServices: handleGetCategoryServices,
    handleGetHotProductServices: handleGetHotProductServices,
    handleGetSaleProductServices: handleGetSaleProductServices,
    handleGetNewProductServices: handleGetNewProductServices,
    getCategoriesService:getCategoriesService,
}