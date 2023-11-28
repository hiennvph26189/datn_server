
import db from "../../models/index";

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
module.exports={
    handleGetAllNews:handleGetAllNews
}