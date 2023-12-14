
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
let AddNewsService = (data)=>{
    return new Promise(async(resolve, reject)=>{
        try {
                if(data){
                    await db.News.create({
                        tieuDe: data.tieuDe,
                        anhTinTuc: data.anhTinTuc,
                        tomTatTinTuc: data.tomTatTinTuc,
                        moTa: data.mota,
                    })
                    resolve({
                        errCode: 0,
                        errMessage: "Ok",
                        data
                        
                    })
                }else{
                    resolve({
                        errCode: 2,
                        errMessage: "Không có dữ liệu",
                        data :{}
                        
                    })
                }
                
            
           
           
        } catch (error) {
            reject(error)
        }
         
     }) 
}
let EditNewsService = (data)=>{
    return new Promise(async(resolve, reject)=>{
        try {
                if(data){
                    await db.News.update({
                        tieuDe: data.tieuDe,
                        anhTinTuc: data.anhTinTuc,
                        tomTatTinTuc: data.tomTatTinTuc,
                        moTa: data.mota,
                    },
                    {where: {id: data.id}}
                    )
                    resolve({
                        errCode: 0,
                        errMessage: "Ok",
                        data
                        
                    })
                }else{
                    resolve({
                        errCode: 2,
                        errMessage: "Không có dữ liệu",
                        data :{}
                        
                    })
                }
               
            
           
           
        } catch (error) {
            reject(error)
        }
         
     }) 
}
let DeleteNewsService = (id)=>{
    return new Promise(async(resolve, reject)=>{
        try {
                if(id){
                    await db.News.destroy(
                    {where: {id:id}}
                    )
                    resolve({
                        errCode: 0,
                        errMessage: "Ok",
                        
                        
                    })
                }else{
                    resolve({
                        errCode: 2,
                        errMessage: "Không có dữ liệu",
                        
                        
                    })
                }
               
            
           
           
        } catch (error) {
            reject(error)
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
                    let limit = 2; // Số lượng sản phẩm trên mỗi trang
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
module.exports = {
    handleGetAllNews:handleGetAllNews,
    AddNewsService:AddNewsService,
    EditNewsService:EditNewsService,
    DeleteNewsService:DeleteNewsService,
    getNewsWithPagination:getNewsWithPagination,
}