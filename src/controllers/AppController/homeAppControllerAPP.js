import homeAppService from "../../services/appServices/homeAppServicesAPP";

let handleGetProduct = async (req, res) => {
    try {
        let productList = await homeAppService.handleGetProductServices();
        console.log(productList.errCode);
        return res.status(200).json(productList);
    } catch (error) {
        console.log("Lỗi phân quyền", error);
        return res.status(200).json({
            errCode: -1,
            errMessage: "Không kết nối được với sever",
        });
    }
};
let handlePostCategory = async (req, res) => {
    try {
        let data = req.body;
        let addCategory = await homeAppService.handleAddCategoryServices(data);
        return res.status(200).json(addCategory);
        // return res.send(ten)
    } catch (error) {
        console.log("Lỗi phân quyền", error);
        return res.status(200).json({
            errCode: -1,
            errMessage: "Không kết nối được với sever",
        });
    }
};
let handlePutCategory = async (req, res) => {
    try {
        let data = req.body;
        let putCategory = await homeAppService.handlePutCategoryServices(data);
        return res.status(200).json(putCategory);
        // return res.send(ten)
    } catch (error) {
        console.log("Lỗi phân quyền", error);
        return res.status(200).json({
            errCode: -1,
            errMessage: "Không kết nối được với sever",
        });
    }
};
let handleDeleteCategory = async (req, res) => {
    try {
        let id = req.body;
        let deleteCategory = await homeAppService.handleDeleteCategoryServices(id);
        return res.status(200).json(deleteCategory);
        // return res.send(ten)
    } catch (error) {
        console.log("Lỗi phân quyền", error);
        return res.status(200).json({
            errCode: -1,
            errMessage: "Không kết nối được với sever",
        });
    }
};
let handleGetCategories = async (req, res) => {
    try {
        let categoriesList = await homeAppService.handleGetCategoryServices();
        console.log(categoriesList.errCode);
        return res.status(200).json(categoriesList);
    } catch (error) {
        console.log("Lỗi phân quyền", error);
        return res.status(200).json({
            errCode: -1,
            errMessage: "Không kết nối được với sever",
        });
    }
};


let handleGetNewProduct = async (req, res) => {
    try {
        let newProductList = await homeAppService.handleGetNewProductServices();
        console.log(newProductList.errCode);
        return res.status(200).json(newProductList);
    } catch (error) {
        console.log("Lỗi phân quyền", error);
        return res.status(200).json({
            errCode: -1,
            errMessage: "Không kết nối được với sever",
        });
    }
};
module.exports = {
    handleGetProduct: handleGetProduct,
    handlePostCategory: handlePostCategory,
    handlePutCategory: handlePutCategory,
    handleDeleteCategory: handleDeleteCategory,
    handleGetCategories: handleGetCategories,
    
    
    handleGetNewProduct: handleGetNewProduct,
};
