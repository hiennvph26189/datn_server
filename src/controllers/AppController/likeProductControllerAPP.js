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
let getLikeProducts = async (req, res) => {
    try {
        let dulieu = await likeProductServiceAPP.LikeProductServices();
        return res.status(200).json(dulieu)
    } catch (error) {
        console.log("Lỗi phân quyền", error)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Không kết nối được với sever'
        })
    }

}
module.exports = {
    handlePostLikeProduct:handlePostLikeProduct,
    handleDeleteLikeProduct:handleDeleteLikeProduct,
    getLikeProducts:getLikeProducts,
};

