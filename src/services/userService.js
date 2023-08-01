const { QueryTypes } = require('sequelize');
// import sequelize from "../../src/config/queryDatabase"
import sequelize from "../config/queryDatabse"
let handleGetUser = (data)=>{
    return new Promise(async(resolve, reject)=>{
       
        try {
            const result = await sequelize.query(`
                SELECT *
                FROM users
                ORDER BY id DESC
                `, { type: QueryTypes.SELECT });
          
                resolve({ 
                    errCode:0,
                    errMessage: 'thành công',
                    result:result
                 })     
  
        } catch (error) {
             reject(error);
        }
         
         
     }) 
}
module.exports  = {
    handleGetUser:handleGetUser

}