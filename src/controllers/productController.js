import productService from "../services/productService";

let handleGetProduct = async (req, res) => {
    
    try {
        let data = await productService.handleGetProduct();
        return res.render('admin/product.ejs',{data:data}) 
     } catch (error) {
         console.log("Lỗi phân quyền",error)
        return res.status(200).json({
             errCode: -1,
             errMessage: 'Không kết nối được với sever'
        })
     }
   
};
let handleDeleteProduct = async (req, res) => {
    try {
        let id = req.body;
        let deleteProduct = await homeAppService.handleDeleteProduct(id);
        return res.status(200).json(deleteProduct)
        // return res.send(ten)


    } catch (error) {
        console.log("Lỗi phân quyền", error)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Không kết nối được với sever'
        })

    }

};
module.exports = {
    handleGetProduct:handleGetProduct,
    handleDeleteProduct:handleDeleteProduct
}