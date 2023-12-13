import db from "../../models/index";
const { QueryTypes } = require('sequelize');
// import sequelize from "../../src/config/queryDatabase"
import sequelize from "../../config/queryDatabse"
import dateTime from "../getDate";

let handleGetAllCategories = ()=>{
    return new Promise(async(resolve, reject)=>{
        try {
            let res = {}
            let Roleid = await db.Categories.findAll();
            res.errCode = 0;
            res.errMessage = "OK",
            res.data = Roleid;
            resolve(res)
      
         resolve(res);
 
        } catch (error) {
             reject(error);
        }
         
         
     }) 
}
let getCategoryWithPagination = (page)=>{
    return new Promise(async(resolve, reject)=>{
        try {
            let totalCount = await sequelize.query(`
                    SELECT COUNT(*) as total FROM  categories 
                        `, { type: QueryTypes.SELECT });
                    let pageNumber = page;
                    let limit = 10; // Số lượng sản phẩm trên mỗi trang
                    let offset = (pageNumber - 1) * limit;
                    let  categories = await sequelize.query(`
                    SELECT * FROM  categories  order by id desc limit ${limit} OFFSET ${offset}
                        `, { type: QueryTypes.SELECT });
                    let totalPages = Math.ceil(totalCount[0].total / limit);
                    if(categories.length > 0 ){
                        resolve({ 
                            errCode:0,
                            errMessage: 'thành công',
                            categories:categories,
                            nameCategories: "Loai san pham",
                            totalCount:totalPages
                        })
                    }    
  
        } catch (error) {
             reject(error);
        }
     }) 
}
module.exports  = {
    handleGetAllCategories: handleGetAllCategories,
    getCategoryWithPagination:getCategoryWithPagination,
}
