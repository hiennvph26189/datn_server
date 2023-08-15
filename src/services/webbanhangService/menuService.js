const { QueryTypes } = require('sequelize');
// import sequelize from "../../src/config/queryDatabase"
import sequelize from "../../config/queryDatabse"
let getCategoriesService = ()=>{
    return new Promise(async(resolve, reject)=>{
       
        try {

            let  data1 = await sequelize.query(`
            SELECT * FROM  categories 
                `, { type: QueryTypes.SELECT });
                console.log(data1);
               
                resolve({ 
                    errCode:0,
                    errMessage: 'thành công',
                    data:data1
                 })
                      
  
        } catch (error) {
             reject(error);
        }
         
         
     }) 
}

module.exports  = {
    getCategoriesService:getCategoriesService,   
}