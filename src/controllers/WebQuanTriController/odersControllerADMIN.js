import odersService from "../../services/webQuanTriService/odersServiceADMIN";
let handleGetAllOrdersProducts = async (req, res) => {
    try {
        let status = req.query.status
        let message = await  odersService.handleGetAllOrder(status)
        return res.status(200).json(message)
     } catch (error) {
         console.log("Lỗi phân quyền",error)
        return res.status(200).json({
             errCode: -1,
             errMessage: 'Không kết nối được với sever'
        })
     } 
}
let handleHuyDonThanhCongProducts = async (req, res) => {
    try {
        let data = req.body
        console.log(data,"kd;adf")
        let message = await  odersService.handleHuyDonThanhCongService(data)
        return res.status(200).json(message)
     } catch (error) {
         console.log("Lỗi phân quyền",error)
        return res.status(200).json({
             errCode: -1,
             errMessage: 'Không kết nối được với sever'
        })
     } 
}

let handleCheckOrder = async (req, res) => {
    try {
        let data = req.body
        
        let message = await  odersService.handleCheckOrderService(data)
        return res.status(200).json(message)
     } catch (error) {
         console.log("Lỗi phân quyền",error)
        return res.status(200).json({
             errCode: -1,
             errMessage: 'Không kết nối được với sever'
        })
     } 
}
let handleGiaoDonOrder = async (req, res) => {
    try {
        let data = req.body
        
        let message = await  odersService.handleGiaoDonService(data)
        return res.status(200).json(message)
     } catch (error) {
         console.log("Lỗi phân quyền",error)
        return res.status(200).json({
             errCode: -1,
             errMessage: 'Không kết nối được với sever'
        })
     } 
}
let handleThongKeOrders = async (req, res) => {
    try {
        
        let data = req.query
       
        let message = await  odersService.handleThongKeOrdersService(data)
        return res.status(200).json(message)
     } catch (error) {
         console.log("Lỗi phân quyền",error)
        return res.status(200).json({



             errCode: -1,
             errMessage: 'Không kết nối được với sever'
        })
     } 
}

module.exports = {
    handleOdersProducts: handleOdersProducts,
    handleGetAllOrdersProducts:handleGetAllOrdersProducts,
    handleHuyDonThanhCongProducts:handleHuyDonThanhCongProducts,
    handleCheckOrder:handleCheckOrder,
    handleGiaoDonOrder:handleGiaoDonOrder,
    handleThongKeOrders:handleThongKeOrders
  
}