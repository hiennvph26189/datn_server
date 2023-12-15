import thanhtoan from "../../services/webQuanTriService/thanhtoanServiceADMIN";

let handleGetThanhToan = async (req, res) => {
    try {
        let page =  req.query.page;
        let dulieu = await thanhtoan.getThanhToanWithPagination(page);
        return res.status(200).json(dulieu) 
     } catch (error) {
         console.log("Lỗi phân quyền",error)
        return res.status(200).json({
             errCode: -1,
             errMessage: 'Không kết nối được với sever'
        })
     }
   
};

let handleSearchThanhtoan = async (req, res) => {
    try {  
        let key_search = req.query.key_search;
        let page = req.query.page;
        let data = await thanhtoan.handleSearchThanhtoanServiceADMIN(key_search,page);
     return res.status(200).json(data)
 } catch (error) {
     console.log("Lỗi phân quyền",error)
    return res.status(200).json({
         errCode: -1,
         errMessage: 'Không kết nối được với sever'
    })
 }
};

module.exports  = {
    handleGetThanhToan:handleGetThanhToan,
    handleSearchThanhtoan:handleSearchThanhtoan

}
