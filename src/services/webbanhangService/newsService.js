const { QueryTypes } = require('sequelize');
// import sequelize from "../../src/config/queryDatabase"
import sequelize from "../../config/queryDatabse"
let getNewsService = (data)=>{
    return new Promise(async(resolve, reject)=>{
       
        try {
            const listNews = await sequelize.query(`
                SELECT *
                FROM news
                ORDER BY id DESC limit 6
                `, { type: QueryTypes.SELECT });
          
                resolve({ 
                    errCode:0,
                    errMessage: 'thành công',
                    listNews:listNews
                 })     
  
        } catch (error) {
             reject(error);
        }
         
         
     }) 
}
let getAllNews = ()=>{
    return new Promise(async(resolve, reject)=>{
       
        try {
            const listNews = await sequelize.query(`
                SELECT *
                FROM news
                ORDER BY id DESC 
                `, { type: QueryTypes.SELECT });
          if(listNews.length >0){
            resolve({ 
                errCode:1,
                errMessage: 'thành công',
                listNews:listNews
             })  
          }else{
            resolve({ 
                errCode:0,
                errMessage: 'Không có',
                listNews:{}
             })  
          }
                  
  
        } catch (error) {
             reject(error);
        }
         
         
     }) 
}
let getOneDetailNews = (id)=>{
    return new Promise(async(resolve, reject)=>{
       
        try {
            const listNews = await sequelize.query(`
                SELECT *
                FROM news where id = '${id}'
                
                `, { type: QueryTypes.SELECT });
          if(listNews.length >0){
            resolve({ 
                errCode:1,
                errMessage: 'thành công',
                listNews:listNews
             })  
          }else{
            resolve({ 
                errCode:0,
                errMessage: 'Không có',
                listNews:{}
             })  
          }
                  
  
        } catch (error) {
             reject(error);
        }
         
         
     }) 
}

module.exports  = {
    getNewsService:getNewsService,
    getAllNews:getAllNews,
    getOneDetailNews:getOneDetailNews

}