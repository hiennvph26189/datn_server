import likeProductServiceAPP from "../../services/appServices/likeProductServiceAPP";
let handlePostLikeProduct = async (req, res) => {
    try {
        let data  = req.body;
        let postLienHe = await likeProductServiceAPP.postLikeProductService(data);
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
let handleDeleteLikeProduct = async (req, res) => {
    try {
        let data  = req.body;
        let postLienHe = await likeProductServiceAPP.deleteLikeProductService(data);
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
let handleGetOneLikeProducts = async (req, res) => {
    try {
        let data  = req.query;
        let postLienHe = await likeProductServiceAPP.handleGetOneLikeProductsService(data);
            return res.status(200).json(postLienHe)
        
        
     } catch (error) {
         console.log("Lỗi phân quyền",error)
        return res.status(200).json({
             errCode: -1,
             errMessage: 'Không kết nối được với sever'
        })
     }
};
let getLikeProducts = async (req, res) => {
    try {
        let id_members = req.query.id_members
        let id_sp = req.query.id_sp
        let getLikePrd = await likeProductServiceAPP.LikeProductServices(id_members);

            return res.status(200).json(getLikePrd)
        
     } catch (error) {
         console.log("Lỗi phân quyền",error)
        return res.status(200).json({
             errCode: -1,
             errMessage: 'Không kết nối được với sever'
        })
     }
};
module.exports = {
    handlePostLikeProduct:handlePostLikeProduct,
    handleDeleteLikeProduct:handleDeleteLikeProduct,
    getLikeProducts:getLikeProducts,
    handleGetOneLikeProducts:handleGetOneLikeProducts
};

