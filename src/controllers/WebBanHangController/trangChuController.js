import productWebBanHangService from "../../services/webbanhangService/productWebBanHangService";
let getTrangChu = async (req, res) => {
    
  
    try {
        let listNewProducts = await productWebBanHangService.getNewProductsService()
       let arrData = listNewProducts.newProducts
       
       const newArray = arrData.map(item => {
        return {
          ...item,
          giaSanPham: item.giaSanPham.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }),
          giaBan: (item.giaSanPham-(item.giaSanPham*(item.sale/100))).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }),
          image: JSON.parse(item.image)[0] // Chỉ lấy phần tử đầu tiên của mảng img
        };
      }); 
      console.log(newArray)
      return res.render("webBanHang/TrangChu",{newProducts:newArray})
     } catch (error) {
         console.log("Lỗi phân quyền",error)
        return res.status(200).json({
             errCode: -1,
             errMessage: 'Không kết nối được với sever'
        })
     }
   
};
let getNewProductsHome = async (req, res) => {
    
   
    try {
       let listNewProducts = await productWebBanHangService.getNewProductsService()
       let arrData = listNewProducts.newProducts
       console.log("asd;akdkd")
       const newArray = arrData.map(item => {
        return {
          ...item,
          giaSanPham: item.giaSanPham.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }),
          giaBan: (item.giaSanPham-(item.giaSanPham*(item.sale/100))).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }),
          image: JSON.parse(item.image)[0] // Chỉ lấy phần tử đầu tiên của mảng img
        };
      }); 
      
        return res.render("webBanHang/TrangChu",{newProducts:newArray})
     } catch (error) {
         console.log("Lỗi phân quyền",error)
        return res.status(200).json({
             errCode: -1,
             errMessage: 'Không kết nối được với sever'
        })
     }
   
};
module.exports = {
    getTrangChu:getTrangChu,
    getNewProductsHome:getNewProductsHome
   
}