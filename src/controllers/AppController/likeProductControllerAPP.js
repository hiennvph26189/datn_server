import likeProductServiceAPP from "../../services/appServices/likeProductServiceAPP";
let handlePostLikeProduct = async (req, res) => {
    try {
        let data  = req.body;
        let postLienHe = await likeProductServiceAPP.postLikeProductService(data);
       
            return res.status(200).json(postLienHe)
      
        
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
        let data  = req.query;
        let postLienHe = await likeProductServiceAPP.deleteLikeProductService(data);
            
            return res.status(200).json(postLienHe)
      
        
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
let LikeProductServices = (id_members) => {
    
    return new Promise(async (resolve, reject) => {

        try {
            const data = await sequelize.query(`
            SELECT * FROM  members WHERE id = '${id_members}'
                `, { type: QueryTypes.SELECT });
            if (data.length > 0) {
                const listLikePrd = await sequelize.query(`
                SELECT lp.id as id_like, p.*
                FROM like_products lp
                INNER JOIN products p ON lp.id_sp = p.id
                WHERE lp.id_members = '${id_members}'
                    `, { type: QueryTypes.SELECT });

                resolve({
                    errCode: 0,
                    errMessage: 'thành công',
                    listLikePrd: listLikePrd
                })
            } else {
                resolve({
                    errCode: 0,
                    errMessage: 'Không có member',

                })
            }

        } catch (error) {

            reject(error);
        }
    })
}
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
    handleGetOneLikeProducts:handleGetOneLikeProducts,
    LikeProductServices:LikeProductServices,
    
};

