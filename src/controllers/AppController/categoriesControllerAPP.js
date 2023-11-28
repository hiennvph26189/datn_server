import categoriesService from "../../services/appServices/categoriesServiceAPP";
let handleGetAllcategories = async (req, res) => {
    
  
    try {
        let data = await categoriesService.handleGetAllCategories();
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
    handleGetAllcategories: handleGetAllcategories, 
}