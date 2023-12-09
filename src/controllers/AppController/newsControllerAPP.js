import newsService from "../../services/appServices/newsServiceAPP";
let handleGetAllNews = async (req, res) => {
    
  
    try {
        let data = await newsService.handleGetAllNews();
        return res.status(200).json(data) 
     } catch (error) {
         console.log("Lỗi phân quyền",error)
        return res.status(200).json({
             errCode: -1,
             errMessage: 'Không kết nối được với sever'
        })
     }
   
};
module.exports = {
    handleGetAllNews:handleGetAllNews
}