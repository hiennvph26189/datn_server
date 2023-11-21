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
let sapXepProduct = async (req, res) => {
  
  try {
    let id = req.query.id
    let page = req.query.page
    let value = req.query.value
    let getCategoryProducts = await menuService.getSapXepDanhSachSanPhamIdService(id,page,value)
  
    let nameCategories = getCategoryProducts.nameCategories
    let totalCountProducts = getCategoryProducts.totalCount
    let arrProducts = getConvertArrProduct(getCategoryProducts.products)
   
    return res.render("webBanHang/xapXepDanhSachSanPham.ejs",{getCategoryProducts:arrProducts,nameCategories:nameCategories,totalCountProducts:totalCountProducts,id:id,page:parseInt(page),value:value})
 } catch (error) {
     console.log("Lỗi phân quyền",error)
    return res.status(200).json({
         errCode: -1,
         errMessage: 'Không kết nối được với sever'
    })
 }
   
};
let searchItems = async (req, res) => {
  
  try {
    let key_search = req.query.key_search
    let dataSearch = await menuService.searchService(key_search)
    let arrData = getConvertArrProduct(dataSearch.data)
  
    return res.render("webBanHang/search_form.ejs",{dataSearch:arrData})
 } catch (error) {
     console.log("Lỗi phân quyền",error)
    return res.status(200).json({
         errCode: -1,
         errMessage: 'Không kết nối được với sever'
    })
 }
   
};
let searchSubmit = async (req, res) => {
  
  try {
    let key_search = req.query.key_search
    let dataSearch = await menuService.searchService(key_search)
    let arrData = getConvertArrProduct(dataSearch.data)
    console.log(key_search)
    return res.render("webBanHang/search_submit.ejs",{dataSearch:arrData, totalCount:arrData.length, key_search:key_search})
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
    getDanhMucSanPham:getDanhMucSanPham,
    sapXepProduct:sapXepProduct,
    searchItems:searchItems,
    searchSubmit:searchSubmit
   
}