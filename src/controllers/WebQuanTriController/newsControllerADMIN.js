import newsService from "../../services/webQuanTriService/newsServiceADMIN";


let handleAddNews = async (req, res) => {
    try {
        let data = req.body
        let message = await newsService.AddNewsService(data);
        return res.status(200).json(message) 
     } catch (error) {
         console.log("Lỗi phân quyền",error)
        return res.status(200).json({
             errCode: -1,
             errMessage: 'Không kết nối được với sever'
        })
     }
   
};
let handleEditNews = async (req, res) => {
    try {
        let data = req.body
        let message = await newsService.EditNewsService(data);
        return res.status(200).json(message) 
     } catch (error) {
         console.log("Lỗi phân quyền",error)
        return res.status(200).json({
             errCode: -1,
             errMessage: 'Không kết nối được với sever'
        })
     }
   
};
let handleDeleteNews = async (req, res) => {
    
  
    try {
        let id = req.query.id
        let message = await newsService.DeleteNewsService(id);
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
    handleAddNews:handleAddNews,
    handleEditNews:handleEditNews,
    handleDeleteNews:handleDeleteNews
}