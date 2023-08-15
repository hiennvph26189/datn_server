let getTrangChu = async (req, res) => {
    
  
    try {
        // const data = await sequelize.query(`
        //         SELECT *
        //         FROM products
        //         ORDER BY id DESC
        //         `, { type: QueryTypes.SELECT });
    //    let data = await productService.getSanPhamService();
        return res.render("webBanHang/TrangChu")
     } catch (error) {
         console.log("Lỗi phân quyền",error)
        return res.status(200).json({
             errCode: -1,
             errMessage: 'Không kết nối được với sever'
        })
     }
   
};
module.exports = {
    getTrangChu:getTrangChu,
   
}