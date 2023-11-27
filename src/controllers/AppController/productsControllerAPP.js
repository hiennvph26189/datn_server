import productsServicesAPP from "../../services/appServices/productsServicesAPP";
let handleGetHotSaleProduct = async (req, res) => {
    try {
        let saleProductList = await productsServicesAPP.handleGetHotSaleProductServices();
        console.log(saleProductList.errCode);
        return res.status(200).json(saleProductList);
    } catch (error) {
        console.log("Lỗi phân quyền", error);
        return res.status(200).json({
            errCode: -1,
            errMessage: "Không kết nối được với sever",
        });
    }
};
let handleGetHotOrdersProduct = async (req, res) => {
    try {
        let hotProductList = await productsServicesAPP.handleGetHotOrdersProductServices();
        console.log(hotProductList.errCode);
        return res.status(200).json(hotProductList);
    } catch (error) {
        console.log("Lỗi phân quyền", error);
        return res.status(200).json({
            errCode: -1,
            errMessage: "Không kết nối được với sever",
        });
    }
};
let getCategoryInProducts = async (req, res) => {
    try {
        let listCategoriesinProducts = await productsServicesAPP.handleGetCategoriesInProductsServices();
      
        return res.status(200).json(listCategoriesinProducts);
    } catch (error) {
        console.log("Lỗi phân quyền", error);
        return res.status(200).json({
            errCode: -1,
            errMessage: "Không kết nối được với sever",
        });
    }
};
let handleGetAllTotalProducts = async (req, res) => {

    try {
            
            let data = await productSercive.handleGetAllTotalProductsService();
            return res.status(200).json(data)
        
         
     } catch (error) {
         console.log("Lỗi phân quyền",error)
        return res.status(200).json({
             errCode: -1,
             errMessage: 'Không kết nối được với sever'
        })
     }
   
};
let handleGetOneProducts = async (req, res) => {
    try {  
        let id = req.query.id;
      
        let data = await productSercive.handleGetOneProductService(id);
     return res.status(200).json(data)
 } catch (error) {
     console.log("Lỗi phân quyền",error)
    return res.status(200).json({
         errCode: -1,
         errMessage: 'Không kết nối được với sever'
    })
 }
};
module.exports = {
    handleGetHotOrdersProduct: handleGetHotOrdersProduct,
    handleGetHotSaleProduct: handleGetHotSaleProduct,
    getCategoryInProducts: getCategoryInProducts,
    handleGetAllTotalProducts:handleGetAllTotalProducts,
    handleGetOneProducts:handleGetOneProducts
}