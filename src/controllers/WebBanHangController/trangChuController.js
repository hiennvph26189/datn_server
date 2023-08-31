import productWebBanHangService from "../../services/webbanhangService/productWebBanHangService";
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
      return res.render("webBanHang/TrangChu",
      {
        newProducts:arrNewProducts,
        listProductsSale:arrProductSale,
        listProductOrder:arrProductOrder
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
     console.log(arrData[0])
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
    getProductsDetailItem:getProductsDetailItem

   
}