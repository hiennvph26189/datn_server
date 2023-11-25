import productWebBanHangService from "../../services/webbanhangService/productWebBanHangService";
require('dotenv').config();

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
let getTrangChu = async (req, res) => {
    
  
    try {
        let listNewProducts = await productWebBanHangService.getNewProductsService()
        let arrNewProducts = getConvertArrProduct(listNewProducts.newProducts)
        
        let listProductsSale = await productWebBanHangService.getProductsSaleService()
        let arrProductSale = getConvertArrProduct(listProductsSale.productsSales)

        let listProductsOrder = await productWebBanHangService.getProductsOrderService()
        let arrProductOrder = getConvertArrProduct(listProductsOrder.productsOrders)

       let listCatrgories = await productWebBanHangService.getCategoriesService()
      //  return res.status(200).json(listCatrgories) 
      return res.render("webBanHang/TrangChu",
      {
        newProducts:arrNewProducts,
        listProductsSale:arrProductSale,
        listProductOrder:arrProductOrder,
        listCatrgories: listCatrgories.data
      })
     } catch (error) {
         console.log("Lỗi phân quyền",error)
        return res.status(200).json({
             errCode: -1,
             errMessage: 'Không kết nối được với sever'
        })
     }
   
};
let getProductsDetailItem = async (req, res) => {
    
  
  try {
     let id = req.query.id
     let product =  await productWebBanHangService.getOneProductService(id)
     let arrData = getConvertArrDetailProduct(product.getOneProduct)
     
    return res.render("webBanHang/modalXemNhanh",{product:arrData[0]})
   
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
    getProductsDetailItem:getProductsDetailItem,  
}