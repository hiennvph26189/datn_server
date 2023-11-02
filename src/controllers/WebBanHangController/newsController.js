import newsService from "../../services/webbanhangService/newsService";
const { format } = require('date-fns');
let formatNew = (arrData)=>{
     
  const newArray = arrData.map(item => {
      return {
        ...item,
        createdAt: format(item.createdAt, 'dd/MM/yyyy')
      };
    }); 
    return newArray;
}
let getTinTucNew = async (req, res) => {
  
    try {
         
        let data = await newsService.getNewsService();
        let newArray = formatNew(data.listNews)
        return res.render("webBanHang/getTinTuc.ejs",{data:newArray})
     } catch (error) {
         console.log("Lỗi phân quyền",error)
        return res.status(200).json({
             errCode: -1,
             errMessage: 'Không kết nối được với sever'
        })
     }
   
};
let getAllTinTuc = async (req, res) => {
  
  try {
      
      let dataNew = await newsService.getAllNews();
      
        let newArray = formatNew(dataNew.listNews)
          return res.render("webBanHang/news.ejs",{dataNew:newArray});
      
      
   } catch (error) {
       console.log("Lỗi phân quyền",error)
      return res.status(200).json({
           errCode: -1,
           errMessage: 'Không kết nối được với sever'
      })
   }
 
};
let getTinTucDetail = async (req, res) => {
  
  try {
      let id = req.query.id
      let dataDetailNew = await newsService.getOneDetailNews(id);
      let newArray = formatNew(dataDetailNew.listNews)
      return res.render("webBanHang/detailNew.ejs",{dataNew:newArray[0]});
      
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
    getAllTinTuc:getAllTinTuc,
    getTinTucDetail:getTinTucDetail
}