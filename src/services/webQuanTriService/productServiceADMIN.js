import db from "../../models/index";
import datetime from "../webbanhangService/getdateService"
import sequelize from "../../config/queryDatabse"
const { QueryTypes } = require('sequelize');

let handleGetAllProductsService = (page)=>{
    return new Promise(async(resolve, reject)=>{
        try {
            console.log(page)
            let limit = 5;
            let offset = (page - 1) * limit;
            let res = {}
            let products = await db.Products.findAndCountAll({
                offset,
                limit,
                
                order: [
                    ['id', 'DESC'],
                    
                ]
                  
              },);
            let categories = await db.Categories.findAll();
            let totalProducts = await db.Products.findAll({
                order: [
                    ['id', 'DESC'],
                   
                ]
            });
            res.errCode = 0;
            res.errMessage = "OK",
            res.products = products.rows ;
            res.categories = categories;
            res.totalProducts = totalProducts;
            
            resolve(res)
            
         resolve(res);
 
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
let handleGetAllCategoriesProductService = (id)=>{
    return new Promise(async(resolve, reject)=>{
        try {
            console.log(id)
            if(id && id==="luotMuaNhieu"){
                let getAllLuotMuaNhieu = await sequelize.query(`
                SELECT *
                FROM products
                Where luotMua > 0 
                ORDER BY luotMua DESC
                `, { type: QueryTypes.SELECT });
                resolve({
                    errCode: 0,
                    errMessage: "OK",
                    getAllLuotMuaNhieu:getAllLuotMuaNhieu
                })

            }else if(id && id==="hotSale"){
                let getHotSaleAll = await sequelize.query(`
                SELECT *
                FROM products
                Where sale >= 10 
                ORDER BY sale DESC
               
                
                `, { type: QueryTypes.SELECT }); 
                resolve({
                    errCode: 0,
                    errMessage: "OK",
                    getHotSaleAll:getHotSaleAll
                })
            }else{
                let products = await sequelize.query(`
                SELECT *
                FROM products
                Where idDanhSach = ${id}
                ORDER BY id DESC
                `, { type: QueryTypes.SELECT });

                resolve({
                    errCode: 0,
                    errMessage: "OK",
                    products:products})
            }
           
           
            
       
 
        } catch (error) {
             reject(error);
        }
         
         
     }) 
}

let handleGetProductsService = (id)=>{
    return new Promise(async(resolve, reject)=>{
        try {
            let res = {}
            let limit = 5;
            let offset = 0 + (page - 1) * limit;
            
            let products = await db.Products.findAndCountAll({
                offset: offset,
                limit: limit,
                order: [["id", "DESC"]],
            });
           
            res.products = [...products];
            
            resolve(res)
            
         resolve(res);
 
        } catch (error) {
             reject(error);
        }
         
         
     }) 
}

let AddProductsService = (data)=>{
    return new Promise(async(resolve, reject)=>{
        try {
            // console.log(data.sizes,"adlfalfn")
                if(data){
                    
                    let listSizes = JSON.parse(data.listSizes)
                    
                    let product =await db.Products.create({
                        tenSp: data.tenSp,
                        hangSx: data.hangSx,
                        giaSanPham: data.giaSanPham,
                        giaNhap: data.giaNhap,
                        idDanhSach: data.idDanhSach,
                        soLuong: data.soLuong,
                       
                        hot: data.hot,
                        sale: data.sale,
                        mota: data.mota,
                        image: data.image,
                    })
                    let date = datetime.getdate()
                    let id_sp = product.id
                    let size_S = listSizes.S?listSizes.S:0
                    let size_M = listSizes.M?listSizes.M:0
                    let size_L = listSizes.L?listSizes.L:0
                    let size_XL = listSizes.XL?listSizes.XL:0
                    let size_XXL = listSizes.XXL?listSizes.XXL:0
                        await sequelize.query(`
                        INSERT INTO sizes (id_sp,S, M, L, XL, XXL, status, createdAt, updatedAt)
                        VALUES (${id_sp}, ${size_S}, ${size_M}, ${size_L},${size_XL},${size_XXL},1,"${date}","${date}");
                        `, { type: QueryTypes.INSERT });
                    resolve({
                        errCode: 0,
                        errMessage: "Ok",
                        data
                        
                    })
                }else{
                    resolve({
                        errCode: 1,
                        errMessage: "Lỗi",
                        data
                        
                    })
                }
                
                
            
           
           
        } catch (error) {
            reject(error)
        }
         
     }) 
}
let deleteProduct = (id)=>{
    return new Promise(async(resolve, reject)=>{
        try {
         let products = await  db.Products.findOne({
            where: {id: id},
            
            
         });
         if(!products){
            resolve({
                errCode: 2,
                errMessage: 'sản phẩm không tồn tại',
            })
           
         }else{
            db.Products.update({ status: 2 }, {
                where: {
                    id: id
                },
              });
             resolve({
                errCode:0,
                errMessage: 'Ẩn thành công'
             })
         }
         
  
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
let editProductsService = (data)=>{
    return new Promise(async(resolve, reject)=>{
        
       try {
        
        if(!data.dataImput.id){
            resolve({
                errCode: 2,
                errMessage:"Products không tồn tại"
            })
        }
        let products = await  db.Products.findOne({
            where: {id: data.dataImput.id},
            raw: false

           
         });
         if(products){
                products.tenSp= data.dataImput.tenSp,
                products.hangSx= data.dataImput.hangSx,
                products.giaSanPham= data.dataImput.giaSanPham,
                products.idDanhSach= data.dataImput.idDanhSach,
                products.giaNhap= data.dataImput.giaNhap,
                products.hot= data.dataImput.hot,
                products.sale= data.dataImput.sale,
                products.soLuong= data.dataImput.soLuong,
                products.mota= data.dataImput.mota,
                products.image= data.dataImput.image,
                products.status= data.dataImput.status,

                
            await products.save()
            let listSizes = JSON.parse(data.dataImput.listSizes)
    
            let date = datetime.getdate()
            let id_sp = data.dataImput.id
            let size_S = listSizes.S?listSizes.S:0
            let size_M = listSizes.M?listSizes.M:0
            let size_L = listSizes.L?listSizes.L:0
            let size_XL = listSizes.XL?listSizes.XL:0
            let size_XXL = listSizes.XXL?listSizes.XXL:0
            let check_size = await sequelize.query(`
                SELECT * FROM  sizes where id_sp = ${id_sp}
                    `, { type: QueryTypes.SELECT });
                
                if(check_size.length > 0){
                         await sequelize.query(`
                         UPDATE sizes
                         SET S = ${size_S}, M = ${size_M}, L = ${size_L}, XL = ${size_XL}, XXL = ${size_XXL}, updatedAt='${date}'
                         WHERE id_sp = ${id_sp}
                        `, { type: QueryTypes.INSERT });
                }else{
                    await sequelize.query(`
                    INSERT INTO sizes (id_sp,S, M, L, XL, XXL, status, createdAt, updatedAt)
                    VALUES (${id_sp}, ${size_S}, ${size_M}, ${size_L},${size_XL},${size_XXL},1,"${date}","${date}");
                    `, { type: QueryTypes.INSERT });
                }
          
                resolve({
                    errCode: 0,
                    errMessage:"Sửa thành công"
                })
           
         }else{
            resolve({
                errCode: 1,
                errMessage:"Sản phẩm không tồn tại"
            })
         }

       } catch (error) {
            reject(error);
       }
        
        
    })
}
let handleSearchProductServiceADMIN = (key_search,page)=>{
    return new Promise(async(resolve, reject)=>{
        try {
            let totalCount = await sequelize.query(`
                SELECT COUNT(*) as total FROM  products where   tenSp LIKE '${key_search}%'
                    `, { type: QueryTypes.SELECT });
                let pageNumber = page;
                let limit = 3; // Số lượng sản phẩm trên mỗi trang
                let offset = (pageNumber - 1) * limit;
            let  data = await sequelize.query(`
            SELECT id,tenSp,giaSanPham,sale,image,luotMua name FROM  products where  tenSp LIKE '${key_search}%' order by id DESC limit ${limit} offset ${offset}
                `, { type: QueryTypes.SELECT });
            let totalPages = Math.ceil(totalCount[0].total / limit); 
           
            if(data.length > 0 && key_search !==""){
                resolve({ 
                    errCode:0,
                    errMessage: 'thành công',
                    data:data,
                    totalCount:totalPages,
                 
                 })
            }else{
                resolve({ 
                    errCode:1,
                    errMessage: 'Không có sản phẩm nào tồn tại',
                    data:[],
                    totalCount:0
                 })
            }
         
         
         
  
        } catch (error) {
             reject(error);
        }
         
         
     }) 
}
module.exports  = {
    handleGetAllProductsService: handleGetAllProductsService,
    AddProductsService:AddProductsService,
    deleteProduct:deleteProduct,
    editProductsService:editProductsService,
    handleGetProductsService:handleGetProductsService,
    handleSearchProductServiceADMIN:handleSearchProductServiceADMIN,
    handleGetOneProductService:handleGetOneProductService,
    handleGetAllTotalProductsService:handleGetAllTotalProductsService,
    handleGetAllCategoriesProductService:handleGetAllCategoriesProductService,
  
    
    
}