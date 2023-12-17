import lienheService from "../../services/webbanhangService/lienheService";
let handleLienHeMembers = async (req, res) => {
    try {
        let data  = req.body;
        let postLienHe = await lienheService.postDataLienHeService(data);
        
        return res.status(200).json(postLienHe)
        
        
     } catch (error) {
         console.log("Lỗi phân quyền",error)
        return res.status(200).json({
             errCode: -1,
             errMessage: 'Không kết nối được với sever'
        })
     }
};
module.exports = {
    handleLienHeMembers:handleLienHeMembers
};