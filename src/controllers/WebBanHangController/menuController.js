import menuService from "../../services/webbanhangService/menuService";
let getCategoryMenu = async (req, res) => {
  
    try {
        let data = await menuService.getCategoriesService();
        
        return res.render("webBanHang/menu.ejs",{data:data.data})
     } catch (error) {
         console.log("Lỗi phân quyền",error)
        return res.status(200).json({
             errCode: -1,
             errMessage: 'Không kết nối được với sever'
        })
     }
   
};
let getCategoryProducts = async (req, res) => {
  
    try {
        let id = req.query.id
        // let data = await menuService.getCategoriesService();
       
        return res.render("webBanHang/danhSachSanPham.ejs",{id:id})
     } catch (error) {
         console.log("Lỗi phân quyền",error)
        return res.status(200).json({
             errCode: -1,
             errMessage: 'Không kết nối được với sever'
        })
     }
   
};
let getDanhMucSanPham = async (req, res) => {
  
    try {
        let data = await menuService.getCategoriesService();
        
        return res.render("webBanHang/danhMucSanPham.ejs",{data:data.data})
     } catch (error) {
         console.log("Lỗi phân quyền",error)
        return res.status(200).json({
             errCode: -1,
             errMessage: 'Không kết nối được với sever'
        })
     }
   
};
module.exports = {
    getCategoryMenu:getCategoryMenu,
    getCategoryProducts:getCategoryProducts,
    getDanhMucSanPham:getDanhMucSanPham
   
}