import productWebBanHangService from "../../services/webbanhangService/productWebBanHangService";
let getSanPhamBanChayProducts = async (req, res) => {
  
    try {
        let data = await productWebBanHangService.getSanPhamBanChayProductsService();
        let arrData = data.data;        
        const newArray = arrData.map(item => {
            return {
              ...item,
              giaSanPham: item.giaSanPham.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }),
              giaBan: (item.giaSanPham-(item.giaSanPham*(item.sale/100))).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }),
              image: JSON.parse(item.image)[0] // Chỉ lấy phần tử đầu tiên của mảng img
            };
          }); 
        return res.render("webBanHang/sanPhamBanChay.ejs",{data:newArray})
     } catch (error) {
         console.log("Lỗi phân quyền",error)
        return res.status(200).json({
             errCode: -1,
             errMessage: 'Không kết nối được với sever'
        })
     }
   
};

module.exports = {
    getSanPhamBanChayProducts:getSanPhamBanChayProducts
    
   
}