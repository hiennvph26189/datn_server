
let getDiaChimember = async (req, res) => {
  
    try {
        
        
        return res.render("webBanHang/addressMember.ejs")
     } catch (error) {
         console.log("Lỗi phân quyền",error)
        return res.status(200).json({
             errCode: -1,
             errMessage: 'Không kết nối được với sever'
        })
     }
   
};  

module.exports = {
    getDiaChimember:getDiaChimember,
}