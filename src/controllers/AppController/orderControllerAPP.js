
import orderServiceAPP from "../../services/appServices/orderServiceAPP";
let handleOrderCard9Pay = async (req, res) => {
    try {
        let data  = req.body.data2;
        let arrTenSp  = req.body.arrTenSp;
        let data_9pay  = req.body.data_9pay;
       
        let post9Pay = await orderServiceAPP.postDataOrder9PayService(data,arrTenSp,data_9pay);
        if(post9Pay.errCode == 0){
            return res.status(200).json(post9Pay)
        }
     } catch (error) {
        console.log("Lỗi phân quyền",error)
       return res.status(200).json({
            errCode: -1,
            errMessage: 'Không kết nối được với sever'
       })

    }
}
let getConvertSha = async (req, res) => {
    try {
        let data1 = req.query.data
        const buff = Buffer.from(data1, 'base64');
        const str = buff.toString('utf-8');
        let data = JSON.parse(str)
            return res.status(200).json(data)
        
     } catch (error) {
        console.log("Lỗi phân quyền",error)
       return res.status(200).json({
            errCode: -1,
            errMessage: 'Không kết nối được với sever'
       })

    }
}
let handleGetUserCartProducts = async (req, res) => {
    try {
        
        let id = req.query.id
        
        let message = await  orderServiceAPP.handleGetUserCart(id)
        return res.status(200).json(message)

     } catch (error) {
         console.log("Lỗi phân quyền",error)
        return res.status(200).json({
             errCode: -1,
             errMessage: 'Không kết nối được với sever'
        })

     }
};
let handleOdersProducts = async (req, res) => {
    try {
        let data = req.body
        
        let message = await  orderServiceAPP.handleAddCart(data)
        return res.status(200).json(message)
     } catch (error) {
         console.log("Lỗi phân quyền",error)
        return res.status(200).json({
             errCode: -1,
             errMessage: 'Không kết nối được với sever'
        })
     } 
}
let handleDeleteCartProducts = async (req, res) => {
    try {
        let id = req.query.id
        let message = await  orderServiceAPP.handleDeleteCart(id)
        return res.status(200).json(message)
     } catch (error) {
         console.log("Lỗi phân quyền",error)
        return res.status(200).json({
             errCode: -1,
             errMessage: 'Không kết nối được với sever'
        })
     } 
}
let handleUpdateCartProducts = async (req, res) => {
    try {
        let data = req.body
        console.log(data)
        let message = await  orderServiceAPP.handleUpdateCart(data)
        return res.status(200).json(message)
     } catch (error) {
         console.log("Lỗi phân quyền",error)
        return res.status(200).json({
             errCode: -1,
             errMessage: 'Không kết nối được với sever'
        })
     } 
}
let handleOrserCartProducts = async (req, res) => {
    try {
        let data = req.body
        console.log(data)
        let message = await  orderServiceAPP.handleCreateOrderCart(data)
        return res.status(200).json(message)
     } catch (error) {
         console.log("Lỗi phân quyền",error)
        return res.status(200).json({
             errCode: -1,
             errMessage: 'Không kết nối được với sever'
        })
     } 
}
let handleLichSuCartProducts = async (req, res) => {
    try {
        let id = req.query.id
       
        let message = await  orderServiceAPP.handleLichSuOrderCart(id)
        return res.status(200).json(message)
     } catch (error) {
         console.log("Lỗi phân quyền",error)
        return res.status(200).json({
             errCode: -1,
             errMessage: 'Không kết nối được với sever'
        })
     } 
}
let handleHuyDonCartProducts = async (req, res) => {
    try {
        let id = req.body.id
        console.log(id)
        let message = await  orderServiceAPP.handleHuyOrderCart(id)
        return res.status(200).json(message)
     } catch (error) {
         console.log("Lỗi phân quyền",error)
        return res.status(200).json({
             errCode: -1,
             errMessage: 'Không kết nối được với sever'
        })
     } 
}
let handleChiTietDonProducts = async (req, res) => {
    try {
        let id = req.query.id
        console.log(id)
        let message = await  orderServiceAPP.handleChiTietOrderCart(id)
        return res.status(200).json(message)
     } catch (error) {
         console.log("Lỗi phân quyền",error)
        return res.status(200).json({
             errCode: -1,
             errMessage: 'Không kết nối được với sever'
        })
     } 
}
let handleDeleteOrder = async (req, res) => {
    try {
        let id = req.query.id
        
        let message = await  orderServiceAPP.handleDeleteOrderService(id)
        return res.status(200).json(message)
     } catch (error) {
         console.log("Lỗi phân quyền",error)
        return res.status(200).json({
             errCode: -1,
             errMessage: 'Không kết nối được với sever'
        })
     } 
}
let handleAddCardProductSizeAPP = async (req, res) => {
    try {
        let data = req.body
        console.log(data);
        let message = await  orderServiceAPP.addCardProductsSezesServiceAPP(data)
        return res.status(200).json(message)
     } catch (error) {
         console.log("Lỗi phân quyền",error)
        return res.status(200).json({
             errCode: -1,
             errMessage: 'Không kết nối được với sever'
        })
     } 
}
let handleCheckSoLuongTheoSize = async (req, res) => {
    try {
        let data = req.body
      
        let message = await  orderServiceAPP.checkSoLuongSanPhamTheoSize(data)
       
        return res.status(200).json(message)
     } catch (error) {
         console.log("Lỗi phân quyền",error)
        return res.status(200).json({
             errCode: -1,
             errMessage: 'Không kết nối được với sever'
        })
     } 
}
let handleResetCart = async (req, res) => {
    try {
        let data  = req.body.data2;
        let arrTenSp  = req.body.arrTenSp;
        let data_9pay  = req.body.data_9pay;
       
        let post9Pay = await orderServiceAPP.resetCartServiceAPP(data,arrTenSp,data_9pay);
  
            return res.status(200).json(post9Pay)
        
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
    handleDeleteCartProducts:handleDeleteCartProducts,
    handleGetUserCartProducts:handleGetUserCartProducts,
    handleUpdateCartProducts:handleUpdateCartProducts,
    handleOrserCartProducts:handleOrserCartProducts,
    handleLichSuCartProducts:handleLichSuCartProducts,
    handleHuyDonCartProducts:handleHuyDonCartProducts,
    handleChiTietDonProducts:handleChiTietDonProducts,
    handleDeleteOrder:handleDeleteOrder,
    handleOrderCard9Pay:handleOrderCard9Pay,
    getConvertSha:getConvertSha,
    handleAddCardProductSizeAPP:handleAddCardProductSizeAPP,
    handleCheckSoLuongTheoSize:handleCheckSoLuongTheoSize,
    handleResetCart:handleResetCart
  
}

