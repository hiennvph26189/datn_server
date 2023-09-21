import productDetailService from "../../services/webbanhangService/productDetailService";
import productWebBanHangService from "../../services/webbanhangService/productWebBanHangService";
let getConvertArrDetailProduct = (arrData)=>{
  
    const newArray = arrData.map(item => {
  
      return {
        ...item,
        giaSanPham: item.giaSanPham.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }),
        giaBanSale: (item.giaSanPham-(item.giaSanPham*(item.sale/100))).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }),
        image: JSON.parse(item.image) // Chỉ lấy phần tử đầu tiên của mảng img
      };
    }); 
    return newArray
  }
let getSanPhamChiTiet = async (req, res) => {
    
  
    try {
        let id = req.query.id
        let product =  await productWebBanHangService.getOneProductService(id)
        let arrData = getConvertArrDetailProduct(product.getOneProduct)
      return res.render("webBanHang/sanPhamChiTiet.ejs",{product:arrData[0]})
     
     } catch (error) {
         console.log("Lỗi phân quyền",error)
        return res.status(200).json({
             errCode: -1,
             errMessage: 'Không kết nối được với sever'
        })
     }
   
  };
  module.exports = {
    
    getSanPhamChiTiet:getSanPhamChiTiet

   
}