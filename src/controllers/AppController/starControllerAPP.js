import startServiceAPP from "../../services/appServices/startServiceAPP";
let postVoteStarProduct = async (req, res) => {
    try {  
       
        let data = req.body
   
        let message = await startServiceAPP.postVoteStarProductServiceAPP(data);
     return res.status(200).json(message)
 } catch (error) {
     console.log("Lỗi phân quyền",error)
    return res.status(200).json({
         errCode: -1,
         errMessage: 'Không kết nối được với sever'
    })
 }
};
let checkVoteStarProduct = async (req, res) => {
    try {  
       
        let data = req.query
   
        let message = await startServiceAPP.checkVoteStartProductService(data);
     return res.status(200).json(message)
 } catch (error) {
     console.log("Lỗi phân quyền",error)
    return res.status(200).json({
         errCode: -1,
         errMessage: 'Không kết nối được với sever'
    })
 }
};
let getTotalStarProduct = async (req, res) => {
    try {  
       
        let id = req.query.id
   
        let message = await startServiceAPP.getTotalStarProductService(id);
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
    postVoteStarProduct: postVoteStarProduct,
    checkVoteStarProduct:checkVoteStarProduct,
    getTotalStarProduct:getTotalStarProduct
}