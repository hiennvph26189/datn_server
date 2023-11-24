import productService from "../../services/testService/productServiceTEST";
const { QueryTypes } = require('sequelize');
// import sequelize from "../../src/config/queryDatabase"
import sequelize from "../../config/queryDatabse"
let listSanPham = async (req, res) => {
    
  
    try {
        // const data = await sequelize.query(`
        //         SELECT *
        //         FROM products
        //         ORDER BY id DESC
        //         `, { type: QueryTypes.SELECT });
       let data = await productService.getSanPhamService();
        return res.status(200).json(data) 
     } catch (error) {
         console.log("Lỗi phân quyền",error)
        return res.status(200).json({
             errCode: -1,
             errMessage: 'Không kết nối được với sever'
        })
     }
   
};
module.exports = {
    listSanPham:listSanPham,
   
}