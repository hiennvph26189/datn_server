import lienheService from "../../services/webbanhangService/lienheService";
let getLienHe = async (req, res) => {
  
    try {
        
        
        return res.render("webBanHang/lienHe.ejs")
     } catch (error) {
         console.log("Lỗi phân quyền",error)
        return res.status(200).json({
             errCode: -1,
             errMessage: 'Không kết nối được với sever'
        })
     }
   
};
let formLienHe = async (req, res) => {
  
    try {
        
        
        return res.render("webBanHang/ajaxFromLienHe.ejs")
     } catch (error) {
         console.log("Lỗi phân quyền",error)
        return res.status(200).json({
             errCode: -1,
             errMessage: 'Không kết nối được với sever'
        })
     }
   
};
let postLienHe = async (req, res) => {
  
    try {
        let data  = req.body;
        let postLienHe = await lienheService.postDataLienHeService(data);
        if(postLienHe.errCode == 1){
            return res.send(postLienHe)
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
    getLienHe:getLienHe,
    postLienHe:postLienHe,
    formLienHe:formLienHe
   
}