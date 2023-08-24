import newsService from "../../services/webbanhangService/newsService";
const { format } = require('date-fns');
let getTinTucNew = async (req, res) => {
  
    try {
        let data = await newsService.getNewsService();
    
        let arrData = data.listNews;        
        const newArray = arrData.map(item => {
            return {
              ...item,
              createdAt: format(item.createdAt, 'dd/MM/yyyy')
            };
          }); 
        return res.render("webBanHang/getTinTuc.ejs",{data:newArray})
     } catch (error) {
         console.log("Lỗi phân quyền",error)
        return res.status(200).json({
             errCode: -1,
             errMessage: 'Không kết nối được với sever'
        })
     }
   
};
module.exports = {
    getTinTucNew:getTinTucNew,
   
   
}