import { el } from "date-fns/locale";
import productDetailService from "../../services/webbanhangService/productDetailService";
import productWebBanHangService from "../../services/webbanhangService/productWebBanHangService";
import productsServicesAPP from "../../services/appServices/productsServicesAPP";
import startServiceAPP from "../../services/appServices/startServiceAPP";
const moment = require('moment-timezone');
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
  let formatDate = (date)=>{
    const timeZone = 'Asia/Ho_Chi_Minh';
    console.log(date);
    const formattedDate = moment(date).tz(timeZone).format('DD/MM/YYYY HH:mm:ss')
    return formattedDate
  } 
let getSanPhamChiTiet = async (req, res) => {
    
  
    try {
        let id = req.query.id
        let product =  await productWebBanHangService.getOneProductService(id)
        let arrSizeProduct = await productsServicesAPP.listSizeInproductServiceApp(id);
        let message = await startServiceAPP.getTotalStarProductService(id);
        let arrVote = []
        message.data.map((item,i) =>{
          arrVote.push({
            ...item, 
            createdAt: formatDate(item.createdAt) 
          })
        })
        let arr = []
        if(arrSizeProduct.errCode == 0){
          arr = Object.entries(arrSizeProduct.data).map(([key, value]) => ({ key, value }));
        }
       
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
              tenSanPham:product.getOneProduct[0].tenSp,
              arrSize :arr,
              arrVote: arrVote
              }
              )
           
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