import menuService from "../../services/webbanhangService/menuService";
let getConvertArrProduct = (arrData)=>{
    const newArray = arrData.map(item => {
      return {
        ...item,
        giaSanPham: item.giaSanPham.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }),
        giaBanSale: (item.giaSanPham-(item.giaSanPham*(item.sale/100))).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }),
        image: JSON.parse(item.image)[0] // Chỉ lấy phần tử đầu tiên của mảng img
      };
    }); 
    return newArray
  }
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
        let page = req.query.page
     
        let getCategoryProducts = await menuService.getDanhSachSanPhamIdService(id,page)
        let nameCategories = getCategoryProducts.nameCategories
        let totalCountProducts = getCategoryProducts.totalCount
        let arrProducts = getConvertArrProduct(getCategoryProducts.products)
        console.log(page)
        return res.render("webBanHang/danhSachSanPham.ejs",{getCategoryProducts:arrProducts,nameCategories:nameCategories,totalCountProducts:totalCountProducts,id:id,page:parseInt(page)})
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