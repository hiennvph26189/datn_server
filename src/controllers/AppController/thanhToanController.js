import thanhToanService from "../../services/appServices/thanhToanService";
let getMethodPayOrder = async (req, res) => {
    try {  
       
        let id_order = req.query.id_order
        let message = await thanhToanService.getMethodPayOrderService(id_order);
     return res.status(200).json(message)
 } catch (error) {
     console.log("Lỗi phân quyền",error)
    return res.status(200).json({
         errCode: -1,
         errMessage: 'Không kết nối được với sever'
    })
 }
};
module.exports = {
    getMethodPayOrder: getMethodPayOrder,
}