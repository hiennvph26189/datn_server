
import db from "../../models/index";
const { QueryTypes } = require('sequelize');
// import sequelize from "../../src/config/queryDatabase"
import sequelize from "../../config/queryDatabse"
import dateTime from "../getDate";

let handleGetAllNews = ()=>{
    return new Promise(async(resolve, reject)=>{
        try {
            let res = {}
            let news = await db.News.findAll({
                order: [
                    ['id', 'DESC'],
                   
                ]
            });
            res.errCode = 0;
            res.errMessage = "OK",
            res.news = news;
            resolve(res)
      
         resolve(res);
 
        } catch (error) {
             reject(error);
        }
         
         
     }) 
}
let getNewsWithPagination = (page)=>{
    return new Promise(async(resolve, reject)=>{
        try {
            let totalCount = await sequelize.query(`
                    SELECT COUNT(*) as total FROM  news 
                        `, { type: QueryTypes.SELECT });
                    let pageNumber = page;
                    let limit = 5; // Số lượng sản phẩm trên mỗi trang
                    let offset = (pageNumber - 1) * limit;
                    let  news = await sequelize.query(`
                    SELECT * FROM  news  order by id desc limit ${limit} OFFSET ${offset}
                        `, { type: QueryTypes.SELECT });
                    let totalPages = Math.ceil(totalCount[0].total / limit);
                    if(news.length > 0 ){
                        resolve({ 
                            errCode:0,
                            errMessage: 'thành công',
                            news:news,
                            nameNews: "Tin Tuc",
                            totalCount:totalPages
                        })
                    }    
  
        } catch (error) {
             reject(error);
        }
     }) 
}
module.exports={
    handleGetAllNews:handleGetAllNews,
    getNewsWithPagination:getNewsWithPagination
}