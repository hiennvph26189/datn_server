import orderServiceAPP from "../../services/appServices/orderServiceAPP";
let handleOrderCard9Pay = async (req, res) => {
    try {
        let data  = req.body;
        let postLienHe = await orderServiceAPP.postDataLienHeService(data);
        if(postLienHe.errCode == 1){
            return res.status(200).json(postLienHe)
        }
        
     } catch (error) {
         console.log("Lỗi phân quyền",error)
        return res.status(200).json({
             errCode: -1,
             errMessage: 'Không kết nối được với sever'
        })
     }
};
module.exports = {
    handleOrderCard9Pay:handleOrderCard9Pay
};