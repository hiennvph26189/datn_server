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

let handleSearchThanhtoanServiceADMIN = (key_search,page)=>{
    return new Promise(async(resolve, reject)=>{
        try {
            let totalCount = await sequelize.query(`
                SELECT COUNT(*) as total FROM  thanhtoan where invoice_no LIKE '${key_search}%'
                    `, { type: QueryTypes.SELECT });
                let pageNumber = page;
                let limit = 3; // Số lượng sản phẩm trên mỗi trang
                let offset = (pageNumber - 1) * limit;
            let  data = await sequelize.query(`
            SELECT id,id_donhang,id_member,card_name,payment_no,invoice_no,amount,description,card_brand,card_number,method,status,created_at name FROM  thanhtoan where  invoice_no LIKE '${key_search}%' order by id DESC limit ${limit} offset ${offset}
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
    handleGetThanhToan9pay:handleGetThanhToan9pay,
    getThanhToanWithPagination:getThanhToanWithPagination,
    handleSearchThanhtoanServiceADMIN:handleSearchThanhtoanServiceADMIN,

}