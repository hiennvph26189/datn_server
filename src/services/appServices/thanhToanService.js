import db from "../../models/index";
const { Sequelize } = require('sequelize');
const { QueryTypes } = require('sequelize');
import sequelize from "../../config/queryDatabse"
import datetime from "../webbanhangService/getdateService"
let getMethodPayOrderService = (id)=>{
    return new Promise(async (resolve, reject)=>{
        try {
   
            let  [selectThanhToan] = await sequelize.query(`
            SELECT * FROM  thanhtoan where  id_donhang = ${id}
                `, { type: QueryTypes.SELECT });
        
                if(selectThanhToan){
                    resolve({
                        errCode:0,
                        errMessage: 'Thành công',
                        selectThanhToan:selectThanhToan
                    })
                }else{
                    resolve({
                        errCode:1,
                        errMessage: 'Chua có thanh toán nào',
                        selectThanhToan:{}
                    })
                }
            
        } catch (error) {
            reject(error);
        }
    })
}
module.exports  = {

    getMethodPayOrderService:getMethodPayOrderService
}