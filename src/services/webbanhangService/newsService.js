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
module.exports  = {
    getNewsService:getNewsService

}