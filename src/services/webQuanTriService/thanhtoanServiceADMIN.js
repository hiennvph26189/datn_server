const { QueryTypes } = require('sequelize');
// import sequelize from "../../src/config/queryDatabase"
import sequelize from "../../config/queryDatabse"
import datetime from "../webbanhangService/getdateService"

let handleGetThanhToan9pay = (data)=>{
    return new Promise(async(resolve, reject)=>{
        try {
            const data = await sequelize.query(`
                SELECT *
                FROM thanhtoan
                ORDER BY id DESC
                `, { type: QueryTypes.SELECT });
          
                resolve({ 
                    errCode:0,
                    errMessage: 'thành công',
                    data:data
                 })     
  
        } catch (error) {
             reject(error);
        }
     }) 
}
let getThanhToanWithPagination = (page)=>{
    return new Promise(async(resolve, reject)=>{
        try {
            let totalCount = await sequelize.query(`
                    SELECT COUNT(*) as total FROM  thanhtoan 
                        `, { type: QueryTypes.SELECT });
                    let pageNumber = page;
                    let limit = 10; // Số lượng sản phẩm trên mỗi trang
                    let offset = (pageNumber - 1) * limit;
                    let  thanhtoan = await sequelize.query(`
                    SELECT * FROM  thanhtoan  order by id desc limit ${limit} OFFSET ${offset}
                        `, { type: QueryTypes.SELECT });
                    
                    let totalPages = Math.ceil(totalCount[0].total / limit);
                   
                    if(thanhtoan.length > 0 ){
                        resolve({ 
                            errCode:0,
                            errMessage: 'thành công',
                            thanhtoan:thanhtoan,
                            nameCategories: "Thanh Toan",
                            totalCount:totalPages
                        })
                    }    
  
        } catch (error) {
             reject(error);
        }
     }) 
}

module.exports  = {
    handleGetThanhToan9pay:handleGetThanhToan9pay,
    getThanhToanWithPagination:getThanhToanWithPagination,

}