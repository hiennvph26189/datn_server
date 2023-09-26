import { el } from "date-fns/locale";
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
let getSanPhamChiTiet = async (req, res) => {
    
  
    try {
        let id = req.query.id
        let product =  await productWebBanHangService.getOneProductService(id)
       
       
        if(product.errCode == 0){
      
          let productsCategory = await productDetailService.getSanPhamLienQuan(product.getOneProduct[0].idDanhSach,id)
          let arrData = getConvertArrDetailProduct(product.getOneProduct)
          let spLienQuan = []
          
          if(productsCategory.errCode == 0){

             spLienQuan = getConvertArrProduct(productsCategory.getSanPhamLienQuanId)
            
             return res.render("webBanHang/sanPhamChiTiet.ejs",{
              product:arrData[0],
              spLienQuan:spLienQuan,
              idDanhSach:product.getOneProduct[0].idDanhSach, 
              tenDanhSach:productsCategory.tenDanhSach, 
              tenSanPham:product.getOneProduct[0].tenSp})
           
          }else{
             spLienQuan = []
             return res.render("webBanHang/sanPhamChiTiet.ejs",{product:arrData[0],spLienQuan:spLienQuan})
          }
         
         
        }else {
          return res.send(product.errMessage)
        }
        
       
      
     
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